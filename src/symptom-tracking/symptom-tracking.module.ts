import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomTrackingService } from './symptom-tracking.service';
import { SymptomTrackingController } from './symptom-tracking.controller';
import { SymptomTracking } from './entities/symptom-tracking.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SymptomTracking]),
    UsersModule,
  ],
  controllers: [SymptomTrackingController],
  providers: [SymptomTrackingService],
  exports: [SymptomTrackingService],
})
export class SymptomTrackingModule {}
