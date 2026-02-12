import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Expense, ExpenseType } from '../expenses/expense.entity';

export interface PredictionResult {
  futureBalance: number;
  safetyBufferRemaining: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  warnings: string[];
  timeline: { date: Date; balance: number; event?: string }[];
}

@Injectable()
export class PredictionService {
  simulatePurchase(user: User, purchaseAmount: number, expenses: Expense[]): PredictionResult {
    const DAYS_TO_SIMULATE = 30;
    const now = new Date();
    let currentBalance = Number(user.currentBalance) - purchaseAmount;
    const timeline: PredictionResult['timeline'] = [{ date: new Date(now), balance: currentBalance }];
    const warnings: string[] = [];

    // Estimate daily variable spend based on past expenses (Simplified for MVP)
    const monthlyVariableSpend = expenses
      .filter((e) => e.type === ExpenseType.VARIABLE)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    const dailyVariableSpend = monthlyVariableSpend / 30;

    for (let i = 1; i <= DAYS_TO_SIMULATE; i++) {
      const simulationDate = new Date(now);
      simulationDate.setDate(now.getDate() + i);
      const simulatedDay = simulationDate.getDate();

      // Subtract daily variable spend
      currentBalance -= dailyVariableSpend;

      // Check for fixed expenses due on this day
      let eventName = '';
      const dueExpenses = expenses.filter(
        (e) => e.type === ExpenseType.FIXED && e.dueDay === simulatedDay,
      );

      for (const expense of dueExpenses) {
        currentBalance -= Number(expense.amount);
        eventName += (eventName ? ', ' : '') + expense.name;
        
        if (currentBalance < Number(user.emergencyBuffer)) {
          warnings.push(`Warning: On ${simulationDate.toLocaleDateString()}, payment for ${expense.name} will dip into your safety buffer.`);
        }
        if (currentBalance < 0) {
          warnings.push(`CRITICAL: On ${simulationDate.toLocaleDateString()}, you may be unable to pay for ${expense.name}.`);
        }
      }

      timeline.push({
        date: new Date(simulationDate),
        balance: currentBalance,
        event: eventName || undefined,
      });
    }

    const safetyBufferRemaining = currentBalance - Number(user.emergencyBuffer);
    let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';

    if (currentBalance < 0) {
      riskLevel = 'High';
    } else if (currentBalance < Number(user.emergencyBuffer)) {
      riskLevel = 'Medium';
    }

    return {
      futureBalance: currentBalance,
      safetyBufferRemaining,
      riskLevel,
      warnings: Array.from(new Set(warnings)), // Deduplicate
      timeline,
    };
  }
}
