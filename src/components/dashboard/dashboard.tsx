'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/data-context';
import { Users, Briefcase, UserCheck, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  const { clients, workers, tasks, validationErrors, rules } = useData();

  const errorCount = validationErrors.filter(e => e.type === 'error').length;
  const warningCount = validationErrors.filter(e => e.type === 'warning').length;
  const activeRulesCount = rules.filter(r => r.active).length;

  const dataCompleteness = Math.round(
    ((clients.length > 0 ? 33 : 0) + 
     (workers.length > 0 ? 33 : 0) + 
     (tasks.length > 0 ? 34 : 0))
  );

  const validationStatus = errorCount === 0 ? 'success' : warningCount > 0 ? 'warning' : 'error';

  const stats = [
    {
      title: 'Clients',
      value: clients.length.toString(),
      description: 'Active client records',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Workers',
      value: workers.length.toString(),
      description: 'Available workers',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Tasks',
      value: tasks.length.toString(),
      description: 'Total tasks',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Active Rules',
      value: activeRulesCount.toString(),
      description: 'Business rules configured',
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your data management pipeline
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-8 h-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Data Completeness
            </CardTitle>
            <CardDescription>
              Progress of data ingestion across all entities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{dataCompleteness}%</span>
              </div>
              <Progress value={dataCompleteness} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium">{clients.length}</div>
                <div className="text-muted-foreground">Clients</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{workers.length}</div>
                <div className="text-muted-foreground">Workers</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{tasks.length}</div>
                <div className="text-muted-foreground">Tasks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Validation Status
            </CardTitle>
            <CardDescription>
              Current data quality and validation results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge 
                variant={validationStatus === 'success' ? 'default' : 
                        validationStatus === 'warning' ? 'secondary' : 'destructive'}
              >
                {validationStatus === 'success' ? 'All Clear' : 
                 validationStatus === 'warning' ? 'Warnings' : 'Errors Found'}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-red-600">Errors</span>
                <span className="font-medium">{errorCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-600">Warnings</span>
                <span className="font-medium">{warningCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Active Rules</span>
                <span className="font-medium">{activeRulesCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {validationErrors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Validation Issues</CardTitle>
            <CardDescription>
              Latest validation errors and warnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {validationErrors.slice(0, 5).map((error) => (
                <div key={error.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full ${
                    error.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{error.message}</div>
                    <div className="text-xs text-muted-foreground">
                      {error.entity} • {error.entityId}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {error.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}