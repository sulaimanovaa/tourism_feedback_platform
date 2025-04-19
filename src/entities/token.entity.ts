import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('password_reset_tokens')
export class PasswordResetTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.passwordResetTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'timestamp' })
  expirationDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
