'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/data-context';
import { Plus, Settings, Trash2, Edit, Power } from 'lucide-react';
import { RuleDialog } from './rule-dailog';
import { Switch } from '@/components/ui/switch';

export function RuleBuilder() {
  const { rules, updateRule, deleteRule } = useData();
  const [showDialog, setShowDialog] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  const activeRules = rules.filter(r => r.active);
  const inactiveRules = rules.filter(r => !r.active);

  const handleEdit = (rule: any) => {
    setEditingRule(rule);
    setShowDialog(true);
  };

  const handleToggle = (ruleId: string, active: boolean) => {
    updateRule(ruleId, { active });
  };

  const getRuleTypeColor = (type: string) => {
    switch (type) {
      case 'coRun': return 'bg-blue-100 text-blue-800';
      case 'slotRestriction': return 'bg-green-100 text-green-800';
      case 'loadLimit': return 'bg-yellow-100 text-yellow-800';
      case 'phaseWindow': return 'bg-purple-100 text-purple-800';
      case 'precedence': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rule Builder</h1>
          <p className="text-muted-foreground">
            Create and manage business rules for your data allocation
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Rule Summary
            </CardTitle>
            <CardDescription>
              Overview of configured rules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Rules</span>
                <Badge variant="outline">{rules.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Rules</span>
                <Badge variant="default">{activeRules.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Inactive Rules</span>
                <Badge variant="secondary">{inactiveRules.length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rule Types</CardTitle>
            <CardDescription>
              Available rule categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Co-run Rules</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Slot Restrictions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Load Limits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Phase Windows</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Precedence Rules</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common rule operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Power className="w-4 h-4 mr-2" />
                Enable All Rules
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Import Rules
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Rule Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {rules.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Configured Rules</CardTitle>
            <CardDescription>
              Manage your business rules and their settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rules.map((rule) => (
                <div 
                  key={rule.id} 
                  className={`p-4 rounded-lg border ${
                    rule.active ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Switch
                          checked={rule.active}
                          onCheckedChange={(checked) => handleToggle(rule.id, checked)}
                        />
                        <Badge className={getRuleTypeColor(rule.type)}>
                          {rule.type}
                        </Badge>
                        <h4 className="font-medium">{rule.name}</h4>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {rule.description}
                      </p>
                      
                      <div className="text-xs text-muted-foreground">
                        <strong>Parameters:</strong> {JSON.stringify(rule.parameters)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(rule)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteRule(rule.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Rules Configured</h3>
            <p className="text-muted-foreground mb-4">
              Start by creating your first business rule to control data allocation
            </p>
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Rule
            </Button>
          </CardContent>
        </Card>
      )}

      <RuleDialog 
        open={showDialog} 
        onOpenChange={setShowDialog}
        editingRule={editingRule}
        onClose={() => {
          setShowDialog(false);
          setEditingRule(null);
        }}
      />
    </div>
  );
}