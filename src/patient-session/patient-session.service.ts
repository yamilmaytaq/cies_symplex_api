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

  private async verifyUserExists(user_id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new BadRequestException(`User with ID ${user_id} does not exist.`);
    }
    return user;
  }

  async create(createPatientSessionDto: CreatePatientSessionDto) {
    const { user_id, ...sessionData } = createPatientSessionDto;

    const user = await this.verifyUserExists(user_id);

    const newSession = this.patientSessionsRepository.create({
      ...sessionData,
      user,
    });

    return this.patientSessionsRepository.save(newSession);
  }

  findAll() {
    return this.patientSessionsRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.patientSessionsRepository.findOne({ where: { session_id: id }, relations: ['user'] });
  }

  async update(id: number, updatePatientSessionDto: UpdatePatientSessionDto) {
    const { user_id, ...sessionData } = updatePatientSessionDto;

    const session = await this.findOne(id);
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found.`);
    }

    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      session.user = user;
    }

    Object.assign(session, sessionData);
    return this.patientSessionsRepository.save(session);
  }

  async remove(id: number) {
    const session = await this.findOne(id);
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found.`);
    }
    return this.patientSessionsRepository.remove(session);
  }
}
