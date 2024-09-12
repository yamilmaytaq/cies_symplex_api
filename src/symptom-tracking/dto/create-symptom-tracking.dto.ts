import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsOptional, IsDateString } from 'class-validator';

export class CreateSymptomTrackingDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado a este síntoma' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'Dolor de cabeza', description: 'Descripción del síntoma' })
  @IsString()
  symptom_description: string;

  @ApiProperty({ example: 3, description: 'Severidad del síntoma entre 1 y 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  symptom_severity: number;

  @ApiProperty({ example: '2023-09-10', description: 'Fecha de inicio del síntoma' })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiProperty({ example: '2023-09-15', description: 'Fecha de fin del síntoma' })
  @IsOptional()
  @IsDateString()
  end_date?: string;
}
