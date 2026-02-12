import { User } from '../users/user.entity';
export declare enum ExpenseType {
    FIXED = "fixed",
    VARIABLE = "variable"
}
export declare class Expense {
    id: string;
    name: string;
    amount: number;
    category: string;
    type: ExpenseType;
    frequency: string;
    dueDay: number;
    lastPaidAt: Date;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
