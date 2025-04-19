import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './users.entity';
import { ServiceEntity } from './services.entity';

@Entity('saved_services')
export class SavedServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => ServiceEntity, { onDelete: 'CASCADE' })
  service: ServiceEntity;

  @CreateDateColumn()
  savedAt: Date;
}
