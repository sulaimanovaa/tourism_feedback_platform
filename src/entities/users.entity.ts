import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewEntity } from './reviews.entity';
import { FollowEntity } from './follow.entity';
import { ServiceEntity } from './services.entity';
import { ReviewLikeEntity } from './review-like.entity';
import { PasswordResetTokenEntity } from './token.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  username: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => ServiceEntity, (service) => service.user)
  services: ServiceEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.follower)
  following: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.following)
  followers: FollowEntity[];

  @OneToMany(() => ReviewLikeEntity, (like) => like.user)
  reviewLikes: ReviewLikeEntity[];

  @OneToMany(() => PasswordResetTokenEntity, (token) => token.user)
  passwordResetTokens: PasswordResetTokenEntity[];
}
