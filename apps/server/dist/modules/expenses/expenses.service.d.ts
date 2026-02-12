import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { User } from '../users/user.entity';
export declare class ExpensesService {
    private readonly expenseRepository;
    constructor(expenseRepository: Repository<Expense>);
    findAllForUser(user: User): Promise<Expense[]>;
    create(expenseData: Partial<Expense>, user: User): Promise<Expense>;
    remove(id: string): Promise<void>;
}
