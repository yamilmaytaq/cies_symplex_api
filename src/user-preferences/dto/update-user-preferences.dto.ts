import { PartialType } from '@nestjs/swagger';
import { CreateUserPreferenceDto } from './create-user-preferences.dto';

export class UpdateUserPreferenceDto extends PartialType(CreateUserPreferenceDto) {}
