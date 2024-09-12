import { PartialType } from '@nestjs/swagger';
import { CreateActivityLogDto } from './create-activity-logs.dto';

export class UpdateActivityLogDto extends PartialType(CreateActivityLogDto) {}
