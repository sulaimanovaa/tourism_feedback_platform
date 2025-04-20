import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewEntity } from './reviews.entity';
import { UserEntity } from './users.entity';

@Entity('review_likes')
export class ReviewLikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.reviewLikes, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => ReviewEntity, (review) => review.reviewLikes, { onDelete: 'CASCADE' })
  review: ReviewEntity;

  @CreateDateColumn()
  createdAt: Date;
}
