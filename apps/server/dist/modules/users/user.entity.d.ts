import { Expense } from '../expenses/expense.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    currentBalance: number;
    emergencyBuffer: number;
    expenses: Expense[];
    createdAt: Date;
    updatedAt: Date;
}
