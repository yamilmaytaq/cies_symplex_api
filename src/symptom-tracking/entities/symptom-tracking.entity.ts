import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('symptom_tracking')
export class SymptomTracking {
  @PrimaryGeneratedColumn()
  symptom_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('text')
  symptom_description: string;

  @Column('int', { nullable: false })
  symptom_severity: number;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true, default: null })
  end_date: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recorded_at: Date;
}
