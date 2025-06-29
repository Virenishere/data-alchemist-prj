'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Client {
  ClientID: string;
  ClientName: string;
  PriorityLevel: number;
  RequestedTaskIDs: string[];
  GroupTag: string;
  AttributesJSON: any;
}

export interface Worker {
  WorkerID: string;
  WorkerName: string;
  Skills: string[];
  AvailableSlots: number[];
  MaxLoadPerPhase: number;
  WorkerGroup: string;
  QualificationLevel: number;
}

export interface Task {
  TaskID: string;
  TaskName: string;
  Category: string;
  Duration: number;
  RequiredSkills: string[];
  PreferredPhases: number[];
  MaxConcurrent: number;
}

export interface ValidationError {
  id: string;
  type: 'error' | 'warning';
  entity: 'client' | 'worker' | 'task';
  entityId: string;
  field?: string;
  message: string;
  suggestion?: string;
}

export interface Rule {
  id: string;
  type: 'coRun' | 'slotRestriction' | 'loadLimit' | 'phaseWindow' | 'precedence';
  name: string;
  description: string;
  parameters: any;
  active: boolean;
}

export interface PriorityWeights {
  priorityLevel: number;
  requestFulfillment: number;
  fairness: number;
  workloadBalance: number;
  skillMatching: number;
}

interface DataContextType {
  clients: Client[];
  workers: Worker[];
  tasks: Task[];
  validationErrors: ValidationError[];
  rules: Rule[];
  priorityWeights: PriorityWeights;
  setClients: (clients: Client[]) => void;
  setWorkers: (workers: Worker[]) => void;
  setTasks: (tasks: Task[]) => void;
  setValidationErrors: (errors: ValidationError[]) => void;
  addRule: (rule: Rule) => void;
  updateRule: (id: string, rule: Partial<Rule>) => void;
  deleteRule: (id: string) => void;
  setPriorityWeights: (weights: PriorityWeights) => void;
  searchData: (query: string) => any[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [priorityWeights, setPriorityWeights] = useState<PriorityWeights>({
    priorityLevel: 30,
    requestFulfillment: 25,
    fairness: 20,
    workloadBalance: 15,
    skillMatching: 10,
  });

  const addRule = (rule: Rule) => {
    setRules(prev => [...prev, rule]);
  };

  const updateRule = (id: string, updatedRule: Partial<Rule>) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, ...updatedRule } : rule
    ));
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  const searchData = (query: string): any[] => {
    // This would integrate with an AI service for natural language processing
    const lowercaseQuery = query.toLowerCase();
    const results: any[] = [];

    // Simple keyword matching for MVP - would be enhanced with AI
    clients.forEach(client => {
      if (JSON.stringify(client).toLowerCase().includes(lowercaseQuery)) {
        results.push({ type: 'client', data: client });
      }
    });

    workers.forEach(worker => {
      if (JSON.stringify(worker).toLowerCase().includes(lowercaseQuery)) {
        results.push({ type: 'worker', data: worker });
      }
    });

    tasks.forEach(task => {
      if (JSON.stringify(task).toLowerCase().includes(lowercaseQuery)) {
        results.push({ type: 'task', data: task });
      }
    });

    return results;
  };

  return (
    <DataContext.Provider
      value={{
        clients,
        workers,
        tasks,
        validationErrors,
        rules,
        priorityWeights,
        setClients,
        setWorkers,
        setTasks,
        setValidationErrors,
        addRule,
        updateRule,
        deleteRule,
        setPriorityWeights,
        searchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}