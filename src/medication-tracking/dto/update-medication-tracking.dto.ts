import { PartialType } from '@nestjs/swagger';
import { CreateMedicationTrackingDto } from './create-medication-tracking.dto';

export class UpdateMedicationTrackingDto extends PartialType(CreateMedicationTrackingDto) {}
