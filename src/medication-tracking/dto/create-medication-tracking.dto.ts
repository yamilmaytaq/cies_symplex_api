import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateMedicationTrackingDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado a este medicamento' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'Paracetamol', description: 'Nombre del medicamento' })
  @IsString()
  medication_name: string;

  @ApiProperty({ example: '500mg', description: 'Dosis del medicamento' })
  @IsString()
  dosage: string;

  @ApiProperty({ example: '2 veces al día', description: 'Frecuencia de uso del medicamento' })
  @IsString()
  frequency: string;

  @ApiProperty({ example: '2023-09-10', description: 'Fecha de inicio del medicamento' })
  @IsDateString()
  start_date: string;

  @ApiProperty({ example: '2023-09-15', description: 'Fecha de fin del medicamento' })
  @IsDateString()
  end_date?: string;
}
