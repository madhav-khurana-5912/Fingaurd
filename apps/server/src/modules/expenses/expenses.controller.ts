import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';
import { User } from '../users/user.entity';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  async findAll(@Body('user') user: User): Promise<Expense[]> {
    return this.expensesService.findAllForUser(user);
  }

  @Post()
  async create(@Body() expenseData: Partial<Expense>, @Body('user') user: User): Promise<Expense> {
    return this.expensesService.create(expenseData, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.expensesService.remove(id);
  }
}
