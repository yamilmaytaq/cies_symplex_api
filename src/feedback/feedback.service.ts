import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
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

  // Crear un registro de feedback
  async create(createFeedbackDto: CreateFeedbackDto) {
    const { user_id, ...feedbackData } = createFeedbackDto;

    // Verificar si el usuario existe
    const user = await this.verifyUserExists(user_id);

    const newFeedback = this.feedbackRepository.create({
      ...feedbackData,
      user,  // Relacionamos el user con el feedback
    });

    return this.feedbackRepository.save(newFeedback);
  }

  // Obtener todos los registros de feedback
  findAll() {
    return this.feedbackRepository.find({ relations: ['user'] });
  }

  // Obtener un registro de feedback por ID
  findOne(id: number) {
    return this.feedbackRepository.findOne({ where: { feedback_id: id }, relations: ['user'] });
  }

  // Actualizar un registro de feedback
  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const { user_id, ...feedbackData } = updateFeedbackDto;

    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found.`);
    }

    // Verificar si el usuario existe (si se proporciona un nuevo user_id)
    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      feedback.user = user;
    }

    Object.assign(feedback, feedbackData);
    return this.feedbackRepository.save(feedback);
  }

  // Eliminar un registro de feedback
  async remove(id: number) {
    const feedback = await this.findOne(id);
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found.`);
    }
    return this.feedbackRepository.remove(feedback);
  }
}
