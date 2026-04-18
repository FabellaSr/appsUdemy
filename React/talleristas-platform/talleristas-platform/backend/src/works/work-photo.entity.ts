import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { Work } from './work.entity';

@Entity('work_photos')
export class WorkPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  url: string;

  @Column({ length: 255, nullable: true })
  caption: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Work, (w) => w.photos, { onDelete: 'CASCADE' })
  @JoinColumn()
  work: Work;
}
