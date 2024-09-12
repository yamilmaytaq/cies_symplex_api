import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ length: 50, unique: true })
  role_name: string;
}
