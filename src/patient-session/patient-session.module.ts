import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientSessionsService } from './patient-session.service';
import { PatientSessionsController } from './patient-session.controller';
import { PatientSessions } from './entities/patient-session.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientSessions]),
    UsersModule,
  ],
  controllers: [PatientSessionsController],
  providers: [PatientSessionsService],
  exports: [PatientSessionsService],
})
export class PatientSessionsModule {}
