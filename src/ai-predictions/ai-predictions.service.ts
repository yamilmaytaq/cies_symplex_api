import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiPredictions } from './entities/ai-predictions.entity';
import { CreateAiPredictionDto } from './dto/create-ai-predictions.dto';
import { UpdateAiPredictionDto } from './dto/update-ai-predictions.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AiPredictionsService {
  constructor(
    @InjectRepository(AiPredictions)
    private readonly aiPredictionsRepository: Repository<AiPredictions>,
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

  // Crear una predicción de IA
  async create(createAiPredictionDto: CreateAiPredictionDto) {
    const { user_id, ...predictionData } = createAiPredictionDto;

    // Verificar si el usuario existe
    const user = await this.verifyUserExists(user_id);

    const newPrediction = this.aiPredictionsRepository.create({
      ...predictionData,
      user,  // Relacionamos el user con la predicción de IA
    });

    return this.aiPredictionsRepository.save(newPrediction);
  }

  // Obtener todas las predicciones de IA
  findAll() {
    return this.aiPredictionsRepository.find({ relations: ['user'] });
  }

  // Obtener una predicción por ID
  findOne(id: number) {
    return this.aiPredictionsRepository.findOne({ where: { prediction_id: id }, relations: ['user'] });
  }

  // Actualizar una predicción de IA
  async update(id: number, updateAiPredictionDto: UpdateAiPredictionDto) {
    const { user_id, ...predictionData } = updateAiPredictionDto;

    const prediction = await this.findOne(id);
    if (!prediction) {
      throw new NotFoundException(`Prediction with ID ${id} not found.`);
    }

    // Verificar si el usuario existe (si se proporciona un nuevo user_id)
    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      prediction.user = user;
    }

    Object.assign(prediction, predictionData);
    return this.aiPredictionsRepository.save(prediction);
  }

  // Eliminar una predicción de IA
  async remove(id: number) {
    const prediction = await this.findOne(id);
    if (!prediction) {
      throw new NotFoundException(`Prediction with ID ${id} not found.`);
    }
    return this.aiPredictionsRepository.remove(prediction);
  }
}
