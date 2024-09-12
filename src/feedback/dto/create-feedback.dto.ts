import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ example: 1, description: 'ID del usuario que deja el feedback' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'Este es un comentario sobre la aplicación', description: 'Comentario del feedback' })
  @IsOptional()
  @IsString()
  comment?: string;
}
