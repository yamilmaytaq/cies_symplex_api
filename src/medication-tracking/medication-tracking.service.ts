import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicationTracking } from './entities/medication-tracking.entity';
import { CreateMedicationTrackingDto } from './dto/create-medication-tracking.dto';
import { UpdateMedicationTrackingDto } from './dto/update-medication-tracking.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MedicationTrackingService {
  constructor(
    @InjectRepository(MedicationTracking)
    private readonly medicationTrackingRepository: Repository<MedicationTracking>,
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

  // Crear un registro de medicación
  async create(createMedicationTrackingDto: CreateMedicationTrackingDto) {
    const { user_id, ...medicationData } = createMedicationTrackingDto;

    // Verificar si el usuario existe
    const user = await this.verifyUserExists(user_id);

    const newMedication = this.medicationTrackingRepository.create({
      ...medicationData,
      user,  // Relacionamos el user con el registro de medicación
    });

    return this.medicationTrackingRepository.save(newMedication);
  }

  // Obtener todos los registros de medicación
  findAll() {
    return this.medicationTrackingRepository.find({ relations: ['user'] });
  }

  // Obtener un registro de medicación por ID
  findOne(id: number) {
    return this.medicationTrackingRepository.findOne({ where: { medication_id: id }, relations: ['user'] });
  }

  // Actualizar un registro de medicación
  async update(id: number, updateMedicationTrackingDto: UpdateMedicationTrackingDto) {
    const { user_id, ...medicationData } = updateMedicationTrackingDto;

    const medication = await this.findOne(id);
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found.`);
    }

    // Verificar si el usuario existe (si se proporciona un nuevo user_id)
    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      medication.user = user;
    }

    Object.assign(medication, medicationData);
    return this.medicationTrackingRepository.save(medication);
  }

  // Eliminar un registro de medicación
  async remove(id: number) {
    const medication = await this.findOne(id);
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found.`);
    }
    return this.medicationTrackingRepository.remove(medication);
  }
}
