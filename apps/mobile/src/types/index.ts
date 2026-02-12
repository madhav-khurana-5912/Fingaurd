// Shared types for the Finance App

export enum ExpenseType {
  FIXED = 'fixed',
  VARIABLE = 'variable',
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: ExpenseType;
  frequency?: string;
  dueDay?: number;
  lastPaidAt?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  currentBalance: number;
  monthlyIncome: number;
  emergencyBuffer: number;
}

export interface PredictionTimeline {
  date: string;
  balance: number;
  event?: string;
}

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface PredictionResult {
  futureBalance: number;
  safetyBufferRemaining: number;
  riskLevel: RiskLevel;
  warnings: string[];
  timeline: PredictionTimeline[];
  suggestion: string;
}

export interface FinancialSummary {
  totalBalance: number;
  safeToSpend: number;
  totalFixedExpenses: number;
  totalVariableExpenses: number;
  daysUntilNextBill: number;
  nextBillName: string;
  nextBillAmount: number;
  riskLevel: RiskLevel;
}
