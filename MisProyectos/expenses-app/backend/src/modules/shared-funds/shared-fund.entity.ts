
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('shared_funds')
export class SharedFundEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  year!: number;

  @Column()
  month!: number;

  @Column('decimal', {
    precision: 18,
    scale: 2,
  })
  targetAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}