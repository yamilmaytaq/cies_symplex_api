import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ example: 1, description: 'ID del usuario que recibe la notificación' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'appointment reminder', description: 'Tipo de notificación' })
  @IsString()
  notification_type: string;

  @ApiProperty({ example: 'Recuerda tu cita el 12 de septiembre a las 10:00', description: 'Mensaje de la notificación' })
  @IsString()
  message: string;
}
