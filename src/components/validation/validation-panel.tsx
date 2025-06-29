'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useData } from '@/contexts/data-context';
import { AlertTriangle, CheckCircle, RefreshCw, Zap, Sparkles, Download } from 'lucide-react';
import { useState } from 'react';
import { validateData } from '@/lib/validation';
import { toast } from 'sonner';
import { ExportDialog } from '@/components/export/export-dialog';

export function ValidationPanel() {
  const { clients, workers, tasks, validationErrors, setValidationErrors } = useData();
  const [isValidating, setIsValidating] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const errorCount = validationErrors.filter(e => e.type === 'error').length;
  const warningCount = validationErrors.filter(e => e.type === 'warning').length;
  const totalIssues = errorCount + warningCount;
  const validationScore = Math.max(0, Math.round(100 - (totalIssues * 5)));
  const hasData = clients.length > 0 || workers.length > 0 || tasks.length > 0;

  const runValidation = async () => {
    setIsValidating(true);
    try {
      const errors = await validateData({ clients, workers, tasks });
      console.log('Standard validation result:', errors); // ✅ debug
      setValidationErrors(errors);
      toast.success(`Validation complete. Found ${errors.length} issues.`);
    } catch (error) {
      console.log(error);
      toast.error('Validation failed');
    } finally {
      setIsValidating(false);
    }
  };

  const runAIValidation = async () => {
    setIsValidating(true);
    try {
      let payload = null;

      if (clients.length > 0) {
        payload = { data: clients, dataType: 'clients' };
      } else if (workers.length > 0) {
        payload = { data: workers, dataType: 'workers' };
      } else if (tasks.length > 0) {
        payload = { data: tasks, dataType: 'tasks' };
      } else {
        toast.error('No data found for AI validation');
        setIsValidating(false);
        return;
      }

      const response = await fetch('/api/ai/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('AI validation result:', result.errors); 
        setValidationErrors(result.errors || []);
        toast.success('AI validation complete!');
      } else {
        await runValidation(); 
      }
    } catch (error) {
      console.log(error);
      await runValidation();
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Zap className="w-8 h-8 text-primary" />
          Data Validation
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive data quality analysis with AI-powered validation and error detection
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Data Quality Score
            </CardTitle>
            <CardDescription>Overall data integrity assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <div className={`text-4xl font-bold ${
                validationScore >= 80 ? 'text-green-600' : 
                validationScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {validationScore}%
              </div>
              <Progress value={validationScore} className="h-3" />
              <div className="flex justify-between text-xs mt-2">
                <span className="text-red-600">Poor</span>
                <span className="text-yellow-600">Good</span>
                <span className="text-green-600">Excellent</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issue Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Issue Summary
            </CardTitle>
            <CardDescription>Breakdown of validation results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Critical Errors</span>
                <Badge variant={errorCount > 0 ? 'destructive' : 'outline'}>{errorCount}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Warnings</span>
                <Badge variant={warningCount > 0 ? 'secondary' : 'outline'}>{warningCount}</Badge>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Issues</span>
                <Badge variant="outline">{totalIssues}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Validation Actions
            </CardTitle>
            <CardDescription>Run comprehensive validation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                onClick={runValidation}
                disabled={isValidating || !hasData}
                className="w-full gap-2"
                variant="outline"
              >
                {isValidating ? <><RefreshCw className="w-4 h-4 animate-spin" />Validating...</>
                : <><CheckCircle className="w-4 h-4" />Run Standard Validation</>}
              </Button>

              <Button 
                onClick={runAIValidation}
                disabled={isValidating || !hasData}
                className="w-full gap-2"
              >
                {isValidating ? <><Sparkles className="w-4 h-4 animate-spin" />AI Validating...</>
                : <><Sparkles className="w-4 h-4" />AI-Powered Validation</>}
              </Button>

              {hasData && errorCount === 0 && (
                <Button onClick={() => setShowExport(true)} className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Export Clean Data
                </Button>
              )}

              <p className="text-xs text-muted-foreground text-center">
                {hasData 
                  ? 'Validates data against 12+ business rules' 
                  : 'Upload data first to run validation'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* No Data */}
      {!hasData && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Data to Validate</h3>
            <p className="text-muted-foreground mb-4">
              Upload your client, worker, or task data first to run validation checks.
            </p>
            <Button onClick={() => window.location.href = '#data'} variant="outline">
              Go to Data Grid
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Validation Results */}
      {validationErrors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Validation Results
            </CardTitle>
            <CardDescription>
              Detailed breakdown of all validation issues found in your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {validationErrors.map(error => (
                <div
                  key={error.id}
                  className={`p-4 rounded-lg border ${
                    error.type === 'error'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <Badge variant={error.type === 'error' ? 'destructive' : 'secondary'}>
                        {error.type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{error.entity}</Badge>
                      <span className="font-medium">{error.entityId}</span>
                    </div>
                    <p className={`text-sm ${
                      error.type === 'error' ? 'text-red-700' : 'text-yellow-700'
                    }`}>
                      {error.message}
                    </p>
                    {error.field && (
                      <p className="text-xs text-muted-foreground">
                        Field: <span className="font-medium">{error.field}</span>
                      </p>
                    )}
                    {error.suggestion && (
                      <div className={`mt-2 p-2 rounded text-xs ${
                        error.type === 'error'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        <div className="flex items-center gap-1 mb-1">
                          <Sparkles className="w-3 h-3" />
                          <strong>Suggestion:</strong>
                        </div>
                        <p>{error.suggestion}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Clear */}
      {validationErrors.length === 0 && hasData && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All Clear!</h3>
            <p className="text-muted-foreground mb-6">
              Your data has passed all validation checks and is ready for export.
            </p>
            <Button onClick={() => setShowExport(true)} className="gap-2">
              <Download className="w-4 h-4" />
              Export Clean Data
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Export Dialog */}
      <ExportDialog open={showExport} onOpenChange={setShowExport} />
    </div>
  );
}
