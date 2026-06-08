import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Work } from '../works/work.entity';
import { Payment } from '../payments/payment.entity';
import { Notification } from '../notifications/notification.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  fullName: string;

  @Column({ length: 255, nullable: true })
  trade: string; // oficio: carpintero, plomero...

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  bio: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  city: string;

  @Column({ length: 500, nullable: true })
  avatarUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (u) => u.provider, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => Work, (w) => w.provider)
  works: Work[];

  @OneToMany(() => Payment, (p) => p.provider)
  payments: Payment[];

  @OneToMany(() => Notification, (n) => n.provider)
  notifications: Notification[];
}
