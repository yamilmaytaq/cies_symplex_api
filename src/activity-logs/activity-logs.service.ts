import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLogs } from './entities/activity-logs.entity';
import { CreateActivityLogDto } from './dto/create-activity-logs.dto';
import { UpdateActivityLogDto } from './dto/update-activity-logs.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectRepository(ActivityLogs)
    private readonly activityLogsRepository: Repository<ActivityLogs>,
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

  async create(createActivityLogDto: CreateActivityLogDto) {
    const { user_id, ...activityData } = createActivityLogDto;

    const user = await this.verifyUserExists(user_id);

    const newActivity = this.activityLogsRepository.create({
      ...activityData,
      user,
    });

    return this.activityLogsRepository.save(newActivity);
  }

  findAll() {
    return this.activityLogsRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.activityLogsRepository.findOne({ where: { activity_id: id }, relations: ['user'] });
  }

  async update(id: number, updateActivityLogDto: UpdateActivityLogDto) {
    const { user_id, ...activityData } = updateActivityLogDto;

    const activity = await this.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }

    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      activity.user = user;
    }

    Object.assign(activity, activityData);
    return this.activityLogsRepository.save(activity);
  }

  async remove(id: number) {
    const activity = await this.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }
    return this.activityLogsRepository.remove(activity);
  }
}
