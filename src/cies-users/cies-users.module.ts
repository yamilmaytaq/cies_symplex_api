import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersCiesController } from './cies-users.controller';
import { UsersCiesService } from './cies-users.service';

@Module({
  imports: [HttpModule],
  controllers: [UsersCiesController],
  providers: [UsersCiesService],
  exports: [UsersCiesService],
})
export class UsersCiesModule {}
