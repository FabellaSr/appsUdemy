import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expenses')
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'date' }) date!: string;
  @Column() categoryId!: string;
  @Column() concept!: string;
  @Column({ type: 'decimal', precision: 18, scale: 2 }) amount!: number;
  @Column() userId!: string;
  @Column({ nullable: true }) receiptUrl?: string;
  @CreateDateColumn() createdAt!: Date;
}
