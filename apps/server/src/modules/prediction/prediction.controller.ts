import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PredictionService, PredictionResult } from './prediction.service';
import { User } from '../users/user.entity';
import { Expense } from '../expenses/expense.entity';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post('simulate')
  async simulate(@Body() body: { user: User; purchaseAmount: number; expenses: Expense[] }): Promise<PredictionResult> {
    return this.predictionService.simulatePurchase(body.user, body.purchaseAmount, body.expenses);
  }
}
