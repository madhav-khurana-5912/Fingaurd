import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { PredictionModule } from './modules/prediction/prediction.module';
import { User } from './modules/users/user.entity';
import { Expense } from './modules/expenses/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Expense],
      synchronize: true, // Only for development
    }),
    AuthModule,
    UsersModule,
    ExpensesModule,
    PredictionModule,
  ],
})
export class AppModule {}
