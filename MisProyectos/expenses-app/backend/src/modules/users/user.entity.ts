import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() authId!: string;
  @Column() email!: string;
  @Column() name!: string;
  @Column({ type: 'varchar', length: 20, default: 'MEMBER' }) role!: 'ADMIN' | 'MEMBER';
}
