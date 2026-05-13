import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('monthly_closes')
@Unique(['year', 'month'])
export class MonthlyCloseEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() year!: number;
  @Column() month!: number;
  @Column({ default: false }) closed!: boolean;
  @Column({ type: 'datetime', nullable: true }) closedAt?: Date;
}
