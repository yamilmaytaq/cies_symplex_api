import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthMetric } from './entities/health-metric.entity';
import { CreateHealthMetricDto } from './dto/create-health-metric.dto';
import { UpdateHealthMetricDto } from './dto/update-health-metric.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HealthMetricsService {
  constructor(
    @InjectRepository(HealthMetric)
    private readonly healthMetricsRepository: Repository<HealthMetric>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async verifyUserExists(user_id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new BadRequestException(`User with ID ${user_id} does not exist.`);
    }
    return user;
  }

  async create(createHealthMetricDto: CreateHealthMetricDto) {
    const { user_id, ...metricData } = createHealthMetricDto;

    const user = await this.verifyUserExists(user_id);

    const newMetric = this.healthMetricsRepository.create({
      ...metricData,
      user,
    });
    return this.healthMetricsRepository.save(newMetric);
  }

  findAll() {
    return this.healthMetricsRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.healthMetricsRepository.findOne({ where: { metric_id: id }, relations: ['user'] });
  }

  async update(id: number, updateHealthMetricDto: UpdateHealthMetricDto) {
    const { user_id, ...metricData } = updateHealthMetricDto;

    const metric = await this.findOne(id);
    if (!metric) {
      throw new NotFoundException(`Health metric with ID ${id} not found`);
    }

    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      metric.user = user;
    }

    Object.assign(metric, metricData);
    return this.healthMetricsRepository.save(metric);
  }

  async remove(id: number) {
    const metric = await this.findOne(id);
    if (!metric) {
      throw new NotFoundException(`Health metric with ID ${id} not found`);
    }
    return this.healthMetricsRepository.remove(metric);
  }
}
