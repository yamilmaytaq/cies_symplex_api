import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateActivityLogDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado a esta actividad' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'consultation', description: 'Tipo de actividad realizada' })
  @IsString()
  activity_type: string;

  @ApiProperty({ example: 'El usuario consultó con el médico', description: 'Descripción de la actividad' })
  @IsOptional()
  @IsString()
  description?: string;
}
