import { PartialType } from '@nestjs/swagger';
import { CreatePatientSessionDto } from './create-patient-session.dto';

export class UpdatePatientSessionDto extends PartialType(CreatePatientSessionDto) {}
