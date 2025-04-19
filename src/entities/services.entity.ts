import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { ReviewEntity } from './reviews.entity';
import { LocationEnum, ServiceCategoryEnum } from 'modules/services/interfaces/services.enums';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column('text', { array: true, nullable: true })
  photos?: string[];

  @Column({ nullable: true })
  sourceUrl?: string;

  @Column({ type: 'decimal', nullable: true })
  price?: number;

  @Column({
    type: 'enum',
    enum: ServiceCategoryEnum,
  })
  category: ServiceCategoryEnum;

  @Column({ nullable: true })
  duration?: string;

  @Column({
    type: 'enum',
    enum: LocationEnum,
  })
  region: LocationEnum;

  @Column({ nullable: true })
  address?: string;

  @Column({ default: 0 })
  averageRating: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @OneToMany(() => ReviewEntity, (review) => review.service)
  reviews: ReviewEntity[];

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
