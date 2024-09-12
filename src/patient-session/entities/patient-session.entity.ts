import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('patient_sessions')
export class PatientSessions {
  @PrimaryGeneratedColumn()
  session_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_time: Date | null;

  @Column({ type: 'interval', nullable: true })
  session_duration: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
