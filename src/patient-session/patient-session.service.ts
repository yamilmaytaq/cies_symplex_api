import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientSessions } from './entities/patient-session.entity';
import { CreatePatientSessionDto } from './dto/create-patient-session.dto';
import { UpdatePatientSessionDto } from './dto/update-patient-session.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PatientSessionsService {
  constructor(
    @InjectRepository(PatientSessions)
    private readonly patientSessionsRepository: Repository<PatientSessions>,
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

  // Crear un registro de sesión
  async create(createPatientSessionDto: CreatePatientSessionDto) {
    const { user_id, ...sessionData } = createPatientSessionDto;

    // Verificar si el usuario existe
    const user = await this.verifyUserExists(user_id);

    const newSession = this.patientSessionsRepository.create({
      ...sessionData,
      user,  // Relacionamos el user con el registro de sesión
    });

    return this.patientSessionsRepository.save(newSession);
  }

  // Obtener todas las sesiones
  findAll() {
    return this.patientSessionsRepository.find({ relations: ['user'] });
  }

  // Obtener una sesión por ID
  findOne(id: number) {
    return this.patientSessionsRepository.findOne({ where: { session_id: id }, relations: ['user'] });
  }

  // Actualizar una sesión
  async update(id: number, updatePatientSessionDto: UpdatePatientSessionDto) {
    const { user_id, ...sessionData } = updatePatientSessionDto;

    const session = await this.findOne(id);
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found.`);
    }

    // Verificar si el usuario existe (si se proporciona un nuevo user_id)
    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      session.user = user;
    }

    Object.assign(session, sessionData);
    return this.patientSessionsRepository.save(session);
  }

  // Eliminar una sesión
  async remove(id: number) {
    const session = await this.findOne(id);
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found.`);
    }
    return this.patientSessionsRepository.remove(session);
  }
}
