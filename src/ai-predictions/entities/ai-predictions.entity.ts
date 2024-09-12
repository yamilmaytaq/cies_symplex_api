import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('ai_predictions')
export class AiPredictions {
  @PrimaryGeneratedColumn()
  prediction_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'jsonb' })
  prediction_result: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  prediction_date: Date;
}
