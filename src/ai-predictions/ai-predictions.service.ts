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

  private async verifyUserExists(user_id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new BadRequestException(`User with ID ${user_id} does not exist.`);
    }
    return user;
  }

  async create(createAiPredictionDto: CreateAiPredictionDto) {
    const { user_id, ...predictionData } = createAiPredictionDto;

    const user = await this.verifyUserExists(user_id);

    const newPrediction = this.aiPredictionsRepository.create({
      ...predictionData,
      user,
    });

    return this.aiPredictionsRepository.save(newPrediction);
  }

  findAll() {
    return this.aiPredictionsRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.aiPredictionsRepository.findOne({ where: { prediction_id: id }, relations: ['user'] });
  }

  async update(id: number, updateAiPredictionDto: UpdateAiPredictionDto) {
    const { user_id, ...predictionData } = updateAiPredictionDto;

    const prediction = await this.findOne(id);
    if (!prediction) {
      throw new NotFoundException(`Prediction with ID ${id} not found.`);
    }

    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      prediction.user = user;
    }

    Object.assign(prediction, predictionData);
    return this.aiPredictionsRepository.save(prediction);
  }

  async remove(id: number) {
    const prediction = await this.findOne(id);
    if (!prediction) {
      throw new NotFoundException(`Prediction with ID ${id} not found.`);
    }
    return this.aiPredictionsRepository.remove(prediction);
  }
}
