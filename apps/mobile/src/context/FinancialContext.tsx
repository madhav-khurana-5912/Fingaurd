import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Expense,
  ExpenseType,
  UserProfile,
  PredictionResult,
  FinancialSummary,
} from '../types';
import {
  simulatePurchase,
  calculateSummary,
  generateId,
} from '../utils/financeEngine';

const STORAGE_KEYS = {
  PROFILE: '@finance_profile',
  EXPENSES: '@finance_expenses',
};

// --- Default data for first launch ---
const DEFAULT_PROFILE: UserProfile = {
  id: '1',
  email: 'user@example.com',
  currentBalance: 4450,
  monthlyIncome: 5000,
  emergencyBuffer: 1000,
};

const DEFAULT_EXPENSES: Expense[] = [
  {
    id: generateId(),
    name: 'Rent',
    amount: 1200,
    category: 'Housing',
    type: ExpenseType.FIXED,
    frequency: 'monthly',
    dueDay: 15,
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: 'Electricity',
    amount: 85,
    category: 'Utilities',
    type: ExpenseType.FIXED,
    frequency: 'monthly',
    dueDay: 18,
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: 'Spotify',
    amount: 15,
    category: 'Subscriptions',
    type: ExpenseType.FIXED,
    frequency: 'monthly',
    dueDay: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: 'Internet',
    amount: 60,
    category: 'Utilities',
    type: ExpenseType.FIXED,
    frequency: 'monthly',
    dueDay: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: 'Groceries',
    amount: 400,
    category: 'Food',
    type: ExpenseType.VARIABLE,
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: 'Dining Out',
    amount: 150,
    category: 'Food',
    type: ExpenseType.VARIABLE,
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: 'Transport',
    amount: 120,
    category: 'Transport',
    type: ExpenseType.VARIABLE,
    createdAt: new Date().toISOString(),
  },
];

interface FinancialContextType {
  profile: UserProfile;
  expenses: Expense[];
  summary: FinancialSummary;
  isLoading: boolean;
  updateBalance: (amount: number) => void;
  updateEmergencyBuffer: (amount: number) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  removeExpense: (id: string) => void;
  runSimulation: (purchaseAmount: number) => PredictionResult;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export function FinancialProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [expenses, setExpenses] = useState<Expense[]>(DEFAULT_EXPENSES);
  const [isLoading, setIsLoading] = useState(true);

  // --- Load persisted data on mount ---
  useEffect(() => {
    (async () => {
      try {
        const [storedProfile, storedExpenses] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.PROFILE),
          AsyncStorage.getItem(STORAGE_KEYS.EXPENSES),
        ]);
        if (storedProfile) setProfile(JSON.parse(storedProfile));
        if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
      } catch (e) {
        console.warn('Failed to load persisted data:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // --- Persist data whenever it changes ---
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }
  }, [profile, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    }
  }, [expenses, isLoading]);

  // --- Derived summary ---
  const summary = calculateSummary(
    profile.currentBalance,
    profile.emergencyBuffer,
    expenses,
  );

  // --- Actions ---
  const updateBalance = useCallback((amount: number) => {
    setProfile((prev) => ({ ...prev, currentBalance: amount }));
  }, []);

  const updateEmergencyBuffer = useCallback((amount: number) => {
    setProfile((prev) => ({ ...prev, emergencyBuffer: amount }));
  }, []);

  const addExpense = useCallback(
    (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
      const newExpense: Expense = {
        ...expenseData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setExpenses((prev) => [...prev, newExpense]);
    },
    [],
  );

  const removeExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const runSimulation = useCallback(
    (purchaseAmount: number): PredictionResult => {
      return simulatePurchase(
        profile.currentBalance,
        profile.emergencyBuffer,
        purchaseAmount,
        expenses,
      );
    },
    [profile, expenses],
  );

  return (
    <FinancialContext.Provider
      value={{
        profile,
        expenses,
        summary,
        isLoading,
        updateBalance,
        updateEmergencyBuffer,
        addExpense,
        removeExpense,
        runSimulation,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const ctx = useContext(FinancialContext);
  if (!ctx) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return ctx;
}
