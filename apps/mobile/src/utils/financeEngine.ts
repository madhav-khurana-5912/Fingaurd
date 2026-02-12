import { Expense, ExpenseType, PredictionResult, PredictionTimeline, RiskLevel, FinancialSummary } from '../types';

/**
 * Core prediction engine - runs a 30-day forward simulation of finances.
 * Works entirely offline on the client.
 */
export function simulatePurchase(
  currentBalance: number,
  emergencyBuffer: number,
  purchaseAmount: number,
  expenses: Expense[],
): PredictionResult {
  const DAYS_TO_SIMULATE = 30;
  const now = new Date();
  let balance = currentBalance - purchaseAmount;
  const timeline: PredictionTimeline[] = [
    { date: now.toISOString(), balance },
  ];
  const warnings: string[] = [];

  // Calculate daily variable burn rate
  const monthlyVariable = expenses
    .filter((e) => e.type === ExpenseType.VARIABLE)
    .reduce((sum, e) => sum + e.amount, 0);
  const dailyBurn = monthlyVariable / 30;

  for (let i = 1; i <= DAYS_TO_SIMULATE; i++) {
    const simDate = new Date(now);
    simDate.setDate(now.getDate() + i);
    const dayOfMonth = simDate.getDate();

    balance -= dailyBurn;

    let eventName = '';
    const dueExpenses = expenses.filter(
      (e) => e.type === ExpenseType.FIXED && e.dueDay === dayOfMonth,
    );

    for (const expense of dueExpenses) {
      balance -= expense.amount;
      eventName += (eventName ? ', ' : '') + expense.name;

      if (balance < emergencyBuffer && balance >= 0) {
        warnings.push(
          `Warning: On ${simDate.toLocaleDateString()}, payment for ${expense.name} will use your safety buffer.`,
        );
      }
      if (balance < 0) {
        warnings.push(
          `CRITICAL: On ${simDate.toLocaleDateString()}, you may not be able to pay for ${expense.name}.`,
        );
      }
    }

    timeline.push({
      date: simDate.toISOString(),
      balance: Math.round(balance * 100) / 100,
      event: eventName || undefined,
    });
  }

  const safetyBufferRemaining = balance - emergencyBuffer;
  let riskLevel: RiskLevel = 'Low';
  if (balance < 0) {
    riskLevel = 'High';
  } else if (balance < emergencyBuffer) {
    riskLevel = 'Medium';
  }

  let suggestion = '';
  if (riskLevel === 'High') {
    suggestion =
      'This purchase will likely cause you to miss payments. Consider waiting until after your next paycheck.';
  } else if (riskLevel === 'Medium') {
    suggestion =
      'You can afford this, but it will eat into your safety buffer. Maybe wait a few days?';
  } else {
    suggestion =
      'This looks like a safe purchase! Your finances look healthy.';
  }

  return {
    futureBalance: Math.round(balance * 100) / 100,
    safetyBufferRemaining: Math.round(safetyBufferRemaining * 100) / 100,
    riskLevel,
    warnings: Array.from(new Set(warnings)),
    timeline,
    suggestion,
  };
}

/**
 * Calculate the financial summary for the dashboard.
 */
export function calculateSummary(
  currentBalance: number,
  emergencyBuffer: number,
  expenses: Expense[],
): FinancialSummary {
  const totalFixed = expenses
    .filter((e) => e.type === ExpenseType.FIXED)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalVariable = expenses
    .filter((e) => e.type === ExpenseType.VARIABLE)
    .reduce((sum, e) => sum + e.amount, 0);

  const safeToSpend = Math.max(0, currentBalance - emergencyBuffer - totalFixed);

  // Find the next upcoming bill
  const today = new Date().getDate();
  const fixedExpenses = expenses
    .filter((e) => e.type === ExpenseType.FIXED && e.dueDay !== undefined)
    .sort((a, b) => {
      const daysUntilA = ((a.dueDay! - today + 30) % 30) || 30;
      const daysUntilB = ((b.dueDay! - today + 30) % 30) || 30;
      return daysUntilA - daysUntilB;
    });

  const nextBill = fixedExpenses[0];
  const daysUntilNextBill = nextBill
    ? ((nextBill.dueDay! - today + 30) % 30) || 30
    : 0;

  // Overall risk assessment
  let riskLevel: RiskLevel = 'Low';
  if (currentBalance < totalFixed) {
    riskLevel = 'High';
  } else if (safeToSpend < totalVariable * 0.5) {
    riskLevel = 'Medium';
  }

  return {
    totalBalance: currentBalance,
    safeToSpend: Math.round(safeToSpend * 100) / 100,
    totalFixedExpenses: totalFixed,
    totalVariableExpenses: totalVariable,
    daysUntilNextBill,
    nextBillName: nextBill?.name || 'None',
    nextBillAmount: nextBill?.amount || 0,
    riskLevel,
  };
}

/**
 * Generate a unique ID.
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Format currency.
 */
export function formatCurrency(amount: number): string {
  return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
