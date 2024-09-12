import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthMetricsService } from './health-metrics.service';
import { HealthMetricsController } from './health-metrics.controller';
import { HealthMetric } from './entities/health-metric.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([HealthMetric]), UsersModule],
  controllers: [HealthMetricsController],
  providers: [HealthMetricsService],
  exports: [HealthMetricsService],
})
export class HealthMetricsModule {}
