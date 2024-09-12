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

  // Verificar si el usuario existe
  private async verifyUserExists(user_id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new BadRequestException(`User with ID ${user_id} does not exist.`);
    }
    return user;
  }

  // Crear un registro de actividad
  async create(createActivityLogDto: CreateActivityLogDto) {
    const { user_id, ...activityData } = createActivityLogDto;

    // Verificar si el usuario existe
    const user = await this.verifyUserExists(user_id);

    const newActivity = this.activityLogsRepository.create({
      ...activityData,
      user,  // Relacionamos el user con el registro de actividad
    });

    return this.activityLogsRepository.save(newActivity);
  }

  // Obtener todos los registros de actividad
  findAll() {
    return this.activityLogsRepository.find({ relations: ['user'] });
  }

  // Obtener un registro de actividad por ID
  findOne(id: number) {
    return this.activityLogsRepository.findOne({ where: { activity_id: id }, relations: ['user'] });
  }

  // Actualizar un registro de actividad
  async update(id: number, updateActivityLogDto: UpdateActivityLogDto) {
    const { user_id, ...activityData } = updateActivityLogDto;

    const activity = await this.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }

    // Verificar si el usuario existe (si se proporciona un nuevo user_id)
    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      activity.user = user;
    }

    Object.assign(activity, activityData);
    return this.activityLogsRepository.save(activity);
  }

  // Eliminar un registro de actividad
  async remove(id: number) {
    const activity = await this.findOne(id);
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }
    return this.activityLogsRepository.remove(activity);
  }
}
