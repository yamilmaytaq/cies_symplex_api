import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreatePatientSessionDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado a esta sesión' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: '2023-09-10T14:00:00Z', description: 'Hora de inicio de la sesión' })
  @IsDateString()
  start_time: string;

  @ApiProperty({ example: '2023-09-10T15:00:00Z', description: 'Hora de fin de la sesión' })
  @IsOptional()
  @IsDateString()
  end_time?: string;

  @ApiProperty({ example: '1 hour', description: 'Duración total de la sesión' })
  @IsOptional()
  @IsString()
  session_duration?: string;
}
