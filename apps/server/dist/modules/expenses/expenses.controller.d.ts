import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';
import { User } from '../users/user.entity';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    findAll(user: User): Promise<Expense[]>;
    create(expenseData: Partial<Expense>, user: User): Promise<Expense>;
    remove(id: string): Promise<void>;
}
