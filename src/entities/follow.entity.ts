import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('follows')
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'follower_id' })
  follower: UserEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'following_id' })
  following: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
