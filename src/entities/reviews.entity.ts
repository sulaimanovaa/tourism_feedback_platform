import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { ServiceEntity } from './services.entity';
import { ReviewLikeEntity } from './review-like.entity';
import { LikedAspectEnum, UsageType } from 'modules/reviews/interfaces/reviews.enum';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  experienceDate?: Date;

  @Column({ nullable: true })
  suggestion?: string;

  @Column('enum', { enum: LikedAspectEnum, array: true, nullable: true })
  likedAspects?: LikedAspectEnum[];

  @Column({ nullable: true })
  customLikedAspect?: string;

  @Column('enum', { enum: UsageType })
  usageType?: UsageType;

  @Column({ default: false })
  isRecommended: boolean;

  @Column('text', { array: true, nullable: true })
  photos?: string[];

  @ManyToOne(() => UserEntity, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.reviews, { onDelete: 'CASCADE' })
  service: ServiceEntity;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ReviewLikeEntity, (like) => like.review)
  reviewLikes: ReviewLikeEntity[];
}
