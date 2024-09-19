import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServicesCiesController } from './cies-services.controller';
import { ServicesCiesService } from './cies-services.service';

@Module({
  imports: [HttpModule],
  controllers: [ServicesCiesController],
  providers: [ServicesCiesService],
  exports: [ServicesCiesService],
})
export class ServicesCiesModule {}
