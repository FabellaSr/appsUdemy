import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Provider } from '../providers/provider.entity';
import { WorkPhoto } from './work-photo.entity';

@Entity('works')
export class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  category: string;

  @Column({ default: true })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Provider, (p) => p.works, { onDelete: 'CASCADE' })
  @JoinColumn()
  provider: Provider;

  @OneToMany(() => WorkPhoto, (ph) => ph.work, { cascade: true })
  photos: WorkPhoto[];
}
