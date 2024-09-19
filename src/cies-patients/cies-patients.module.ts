import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PatientsController } from './cies-patients.controller';
import { PatientsService } from './cies-patients.service';

@Module({
  imports: [HttpModule],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
