import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('medication_tracking')
export class MedicationTracking {
  @PrimaryGeneratedColumn()
  medication_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 100 })
  medication_name: string;

  @Column({ length: 50 })
  dosage: string;

  @Column({ length: 50 })
  frequency: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recorded_at: Date;
}
