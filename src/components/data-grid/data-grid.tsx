'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedClientGrid } from './enhanced-client-grid';
import { EnhancedWorkerGrid } from './enhanced-worker-grid';
import { EnhancedTaskGrid } from './enhanced-task-grid';
import { useData } from '@/contexts/data-context';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Upload, Sparkles, CheckCircle } from 'lucide-react';

export function DataGrid() {
  const { clients, workers, tasks, validationErrors } = useData();
  
  const clientErrors = validationErrors.filter(e => e.entity === 'client').length;
  const workerErrors = validationErrors.filter(e => e.entity === 'worker').length;
  const taskErrors = validationErrors.filter(e => e.entity === 'task').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Database className="w-8 h-8 text-primary" />
          Data Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload, view, and manage your data files with AI-powered enhancements and real-time validation
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clients</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Workers</p>
                <p className="text-2xl font-bold">{workers.length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Database className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Guide */}
      {clients.length === 0 && workers.length === 0 && tasks.length === 0 && (
        <Card className="border-dashed border-2">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Upload className="w-6 h-6" />
              Get Started with Your Data
            </CardTitle>
            <CardDescription>
              Follow these simple steps to upload and manage your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-medium">Upload Your Files</h3>
                <p className="text-sm text-muted-foreground">
                  Upload CSV or Excel files for clients, workers, and tasks using the tabs below
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium">AI Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  Use AI to automatically improve data quality and fix common issues
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium">Validate & Export</h3>
                <p className="text-sm text-muted-foreground">
                  Review validation results and export clean, ready-to-use data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="clients" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="clients" className="flex items-center gap-2">
            Clients ({clients.length})
            {clientErrors > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {clientErrors}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="workers" className="flex items-center gap-2">
            Workers ({workers.length})
            {workerErrors > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {workerErrors}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            Tasks ({tasks.length})
            {taskErrors > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {taskErrors}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="clients" className="space-y-4">
          <EnhancedClientGrid />
        </TabsContent>
        
        <TabsContent value="workers" className="space-y-4">
          <EnhancedWorkerGrid />
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <EnhancedTaskGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
}