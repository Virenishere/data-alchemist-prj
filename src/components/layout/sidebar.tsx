'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Grid3X3, 
  Settings, 
  AlertTriangle,
  Bot,
  Crown
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Grid3X3 },
  { id: 'data', label: 'Data Grid', icon: Database },
  { id: 'rules', label: 'Rule Builder', icon: Settings },
  { id: 'prioritization', label: 'Prioritization', icon: Crown },
  { id: 'validation', label: 'Validation', icon: AlertTriangle },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Data Alchemist</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Data Management</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 h-11',
                  activeView === item.id && 'bg-primary text-primary-foreground'
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}