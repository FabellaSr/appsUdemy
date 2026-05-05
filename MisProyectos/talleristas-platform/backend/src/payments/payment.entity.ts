import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { Provider } from '../providers/provider.entity';

export type PaymentStatus = 'pending' | 'paid' | 'cancelled';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ length: 10, default: 'ARS' })
  currency: string;

  @Column({ length: 20, default: 'pending' })
  status: PaymentStatus;

  @Column({ length: 255, nullable: true })
  concept: string;

  @Column({ type: 'datetime', nullable: true })
  paidAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Provider, (p) => p.payments, { onDelete: 'CASCADE' })
  @JoinColumn()
  provider: Provider;
}
