import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

export enum ExpenseType {
  FIXED = 'fixed',
  VARIABLE = 'variable',
}

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: ExpenseType,
    default: ExpenseType.VARIABLE,
  })
  type: ExpenseType;

  @Column({ nullable: true })
  frequency: string; // e.g., 'monthly', 'yearly'

  @Column({ type: 'int', nullable: true })
  dueDay: number; // 1-31

  @Column({ type: 'timestamp', nullable: true })
  lastPaidAt: Date;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
