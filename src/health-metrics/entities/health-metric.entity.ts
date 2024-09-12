import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('health_metrics')
export class HealthMetric {
  @PrimaryGeneratedColumn()
  metric_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Column('decimal', { precision: 5, scale: 2 })
  height: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  blood_pressure: string;

  @Column({ type: 'int', nullable: true })
  heart_rate: number;

  @Column({ type: 'int', nullable: true })
  steps_taken: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recorded_at: Date;
}
