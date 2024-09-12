import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateUserPreferenceDto {
  @ApiProperty({ example: 1, description: 'ID del usuario asociado a estas preferencias' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'daily', description: 'Frecuencia de notificaciones' })
  @IsOptional()
  @IsString()
  notification_frequency?: string;

  @ApiProperty({ example: 'English', description: 'Idioma preferido del usuario' })
  @IsOptional()
  @IsString()
  preferred_language?: string;
}
