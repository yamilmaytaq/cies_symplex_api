import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHealthMetricDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado a las métricas de salud' })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 70.5, description: 'Peso del paciente en kg' })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 1.75, description: 'Altura del paciente en metros' })
  @IsNumber()
  height: number;

  @ApiProperty({ example: '120/80', description: 'Presión arterial' })
  @IsOptional()
  @IsString()
  blood_pressure?: string;

  @ApiProperty({ example: 72, description: 'Frecuencia cardíaca' })
  @IsOptional()
  @IsNumber()
  heart_rate?: number;

  @ApiProperty({ example: 5000, description: 'Número de pasos' })
  @IsOptional()
  @IsNumber()
  steps_taken?: number;

  @ApiProperty({ example: '2023-09-10T14:00:00Z', description: 'Fecha y hora de la medición' })
  @IsOptional()
  recorded_at?: Date;
}
