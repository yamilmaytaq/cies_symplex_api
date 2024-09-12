import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsJSON } from 'class-validator';

export class CreateAiPredictionDto {
  @ApiProperty({ example: 1, description: 'ID del usuario que genera la predicción' })
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: { "prediction": "positive", "confidence": 0.87 },
    description: 'Resultado de la predicción generada por el modelo de IA',
  })
  @IsJSON()
  prediction_result: string;
}
