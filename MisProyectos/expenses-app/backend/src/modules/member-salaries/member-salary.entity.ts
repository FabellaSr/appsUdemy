import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';

// 'uniqueidentifier' es exclusivo de SQL Server.
// En PostgreSQL el equivalente es 'uuid'.
const uuidType = process.env.DB_TYPE === 'postgres' ? 'uuid' : 'uniqueidentifier';

@Entity('member_salaries')
export class MemberSalaryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column(uuidType as any)
  userId!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column() year!: number;
  @Column() month!: number;

  @Column('decimal', { precision: 18, scale: 2 })
  salary!: number;
}
