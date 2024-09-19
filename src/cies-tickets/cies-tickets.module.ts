import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TicketCiesController } from './cies-tickets.controller';
import { TicketCiesService } from './cies-tickets.service';

@Module({
  imports: [HttpModule],
  controllers: [TicketCiesController],
  providers: [TicketCiesService],
  exports: [TicketCiesService],
})
export class TicketCiesModule {}
