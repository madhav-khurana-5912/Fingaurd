import { User } from '../users/user.entity';
import { Expense } from '../expenses/expense.entity';
export interface PredictionResult {
    futureBalance: number;
    safetyBufferRemaining: number;
    riskLevel: 'Low' | 'Medium' | 'High';
    warnings: string[];
    timeline: {
        date: Date;
        balance: number;
        event?: string;
    }[];
}
export declare class PredictionService {
    simulatePurchase(user: User, purchaseAmount: number, expenses: Expense[]): PredictionResult;
}
