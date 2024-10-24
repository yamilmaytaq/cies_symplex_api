import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notifications } from './entities/notifications.entity';
import { CreateNotificationDto } from './dto/create-notifications.dto';
import { UpdateNotificationDto } from './dto/update-notifications.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationsRepository: Repository<Notifications>,
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

  async create(createNotificationDto: CreateNotificationDto) {
    const { user_id, ...notificationData } = createNotificationDto;

    const user = await this.verifyUserExists(user_id);

    const newNotification = this.notificationsRepository.create({
      ...notificationData,
      user,
    });

    return this.notificationsRepository.save(newNotification);
  }

  findAll() {
    return this.notificationsRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.notificationsRepository.findOne({ where: { notification_id: id }, relations: ['user'] });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const { user_id, ...notificationData } = updateNotificationDto;

    const notification = await this.findOne(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found.`);
    }

    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      notification.user = user;
    }

    Object.assign(notification, notificationData);
    return this.notificationsRepository.save(notification);
  }

  async remove(id: number) {
    const notification = await this.findOne(id);
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found.`);
    }
    return this.notificationsRepository.remove(notification);
  }
}
