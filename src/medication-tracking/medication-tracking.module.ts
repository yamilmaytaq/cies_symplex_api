import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationTrackingService } from './medication-tracking.service';
import { MedicationTrackingController } from './medication-tracking.controller';
import { MedicationTracking } from './entities/medication-tracking.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicationTracking]),
    UsersModule,  // Necesitamos el módulo de usuarios para verificar su existencia
  ],
  controllers: [MedicationTrackingController],
  providers: [MedicationTrackingService],
  exports: [MedicationTrackingService],
})
export class MedicationTrackingModule {}
