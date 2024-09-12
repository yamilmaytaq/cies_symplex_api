import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notifications.dto';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {}
