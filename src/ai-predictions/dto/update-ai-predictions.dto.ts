import { PartialType } from '@nestjs/swagger';
import { CreateAiPredictionDto } from './create-ai-predictions.dto';

export class UpdateAiPredictionDto extends PartialType(CreateAiPredictionDto) {}
