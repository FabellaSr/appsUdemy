import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) email!: string;
  @Column() name!: string;
  @Column() passwordHash!: string;
  @Column({ type: 'varchar', length: 20, default: 'MEMBER' }) role!: 'ADMIN' | 'MEMBER';
  @Column({ nullable: true }) refreshToken?: string;
}