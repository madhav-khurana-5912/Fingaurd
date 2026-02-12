import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async findAllForUser(user: User): Promise<Expense[]> {
    return this.expenseRepository.find({ where: { user: { id: user.id } } });
  }

  async create(expenseData: Partial<Expense>, user: User): Promise<Expense> {
    const expense = this.expenseRepository.create({ ...expenseData, user });
    return this.expenseRepository.save(expense);
  }

  async remove(id: string): Promise<void> {
    await this.expenseRepository.delete(id);
  }
}
