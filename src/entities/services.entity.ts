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
import { SavedServiceEntity } from './saved-service.entity';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column('text', { array: true, nullable: true })
  photos?: string[];

  @Column({ nullable: true })
  contactInfo?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
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

  @OneToMany(() => SavedServiceEntity, (saved) => saved.service)
  savedServices: SavedServiceEntity[];

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
