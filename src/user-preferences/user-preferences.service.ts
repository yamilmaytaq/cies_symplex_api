import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreferences } from './entities/user-preferences.entity';
import { CreateUserPreferenceDto } from './dto/create-user-preferences.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preferences.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectRepository(UserPreferences)
    private readonly userPreferencesRepository: Repository<UserPreferences>,
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

  // Crear una preferencia del usuario
  async create(createUserPreferenceDto: CreateUserPreferenceDto) {
    const { user_id, ...preferenceData } = createUserPreferenceDto;

    // Verificar si el usuario existe
    const user = await this.verifyUserExists(user_id);

    const newPreference = this.userPreferencesRepository.create({
      ...preferenceData,
      user,  // Relacionamos el user con las preferencias
    });

    return this.userPreferencesRepository.save(newPreference);
  }

  // Obtener todas las preferencias
  findAll() {
    return this.userPreferencesRepository.find({ relations: ['user'] });
  }

  // Obtener una preferencia por ID
  findOne(id: number) {
    return this.userPreferencesRepository.findOne({ where: { preference_id: id }, relations: ['user'] });
  }

  // Actualizar una preferencia
  async update(id: number, updateUserPreferenceDto: UpdateUserPreferenceDto) {
    const { user_id, ...preferenceData } = updateUserPreferenceDto;

    const preference = await this.findOne(id);
    if (!preference) {
      throw new NotFoundException(`Preference with ID ${id} not found.`);
    }

    // Verificar si el usuario existe (si se proporciona un nuevo user_id)
    if (user_id) {
      const user = await this.verifyUserExists(user_id);
      preference.user = user;
    }

    Object.assign(preference, preferenceData);
    return this.userPreferencesRepository.save(preference);
  }

  // Eliminar una preferencia
  async remove(id: number) {
    const preference = await this.findOne(id);
    if (!preference) {
      throw new NotFoundException(`Preference with ID ${id} not found.`);
    }
    return this.userPreferencesRepository.remove(preference);
  }
}
