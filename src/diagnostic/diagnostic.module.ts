import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatGptService } from './diagnostic.service';
import { DiagnosticoController } from './diagnostic.controller';

@Module({
  imports: [HttpModule],
  controllers: [DiagnosticoController],
  providers: [ChatGptService],
  exports: [ChatGptService],
})
export class DiagnosticModule {}
