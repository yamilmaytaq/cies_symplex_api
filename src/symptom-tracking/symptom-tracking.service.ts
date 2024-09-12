import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SymptomTracking } from './entities/symptom-tracking.entity';
import { CreateSymptomTrackingDto } from './dto/create-symptom-tracking.dto';
import { UpdateSymptomTrackingDto } from './dto/update-symptom-tracking.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SymptomTrackingService {
  constructor(
    @InjectRepository(SymptomTracking)
    private readonly symptomTrackingRepository: Repository<SymptomTracking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Verificamos si el usuario existe
  private async verifyUserExists(user_id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new BadRequestException(`User with ID ${user_id} does not exist.`);
    }
    return user;
  }

  // Crear un registro de síntoma
  async create(createSymptomTrackingDto: CreateSymptomTrackingDto) {
    const { user_id, ...symptomData } = createSymptomTrackingDto;

    // Verificar si el usuario existe
    const user = await this.verifyUserExists(user_id);

    const newSymptom = this.symptomTrackingRepository.create({
      ...symptomData,
      user,  // Relacionamos el user con el registro de síntoma
    });

    return this.symptomTrackingRepository.save(newSymptom);
  }

  // Obtener todos los registros de síntomas
  findAll() {
    return this.symptomTrackingRepository.find({ relations: ['user'] });
  }

  // Obtener un registro de síntoma por ID
  findOne(id: number) {
    return this.symptomTrackingRepository.findOne({ where: { symptom_id: id }, relations: ['user'] });
  }

  // Actualizar un registro de síntoma
  async update(id: number, updateSymptomTrackingDto: UpdateSymptomTrackingDto) {
    const { user_id, ...symptomData } = updateSymptomTrackingDto;

    const symptom = await this.findOne(id);
    if (!symptom) {
      throw new NotFoundException(`Symptom with ID ${id} not found.`);
    }

    // Verificar si el usuario existe (si se proporciona un nuevo user_id)
    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      symptom.user = user;
    }

    Object.assign(symptom, symptomData);
    return this.symptomTrackingRepository.save(symptom);
  }

  // Eliminar un registro de síntoma
  async remove(id: number) {
    const symptom = await this.findOne(id);
    if (!symptom) {
      throw new NotFoundException(`Symptom with ID ${id} not found.`);
    }
    return this.symptomTrackingRepository.remove(symptom);
  }
}
