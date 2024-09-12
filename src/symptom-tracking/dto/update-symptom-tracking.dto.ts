import { PartialType } from '@nestjs/swagger';
import { CreateSymptomTrackingDto } from './create-symptom-tracking.dto';

export class UpdateSymptomTrackingDto extends PartialType(CreateSymptomTrackingDto) {}
