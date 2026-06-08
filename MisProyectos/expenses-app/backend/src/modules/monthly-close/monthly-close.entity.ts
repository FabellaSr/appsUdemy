import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// 'datetime' no existe en PostgreSQL — se usa 'timestamp'.
// TypeORM acepta ambos strings pero mssql ignora 'timestamp' y postgres
// ignora 'datetime', así que elegimos según DB_TYPE en runtime.
const closedAtType = process.env.DB_TYPE === 'postgres' ? 'timestamp' : 'datetime';

@Entity('monthly_closes')
@Unique(['year', 'month'])
export class MonthlyCloseEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() year!: number;
  @Column() month!: number;
  @Column({ default: false }) closed!: boolean;
  @Column({ type: closedAtType as any, nullable: true }) closedAt?: Date;
}
