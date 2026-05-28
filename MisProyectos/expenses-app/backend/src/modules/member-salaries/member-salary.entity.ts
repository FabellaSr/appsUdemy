import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../users/user.entity';

@Entity('member_salaries')
export class MemberSalaryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uniqueidentifier')
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column()
  year!: number;

  @Column()
  month!: number;

  @Column('decimal', {
    precision: 18,
    scale: 2,
  })
  salary!: number;
}