import { PredictionService, PredictionResult } from './prediction.service';
import { User } from '../users/user.entity';
import { Expense } from '../expenses/expense.entity';
export declare class PredictionController {
    private readonly predictionService;
    constructor(predictionService: PredictionService);
    simulate(body: {
        user: User;
        purchaseAmount: number;
        expenses: Expense[];
    }): Promise<PredictionResult>;
}
