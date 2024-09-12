import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiPredictionsService } from './ai-predictions.service';
import { AiPredictionsController } from './ai-predictions.controller';
import { AiPredictions } from './entities/ai-predictions.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AiPredictions]),
    UsersModule,
  ],
  controllers: [AiPredictionsController],
  providers: [AiPredictionsService],
  exports: [AiPredictionsService],
})
export class AiPredictionsModule {}
