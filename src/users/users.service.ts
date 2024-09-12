import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { role_id, password, email, ...userData } = createUserDto;
  
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
  
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
  
    const hashedPassword = await bcryptjs.hash(password, 10);
  
    const role = await this.rolesService.findOne(role_id);
    if (!role) {
      throw new BadRequestException('Invalid role');
    }
  
    const newUser = this.userRepository.create({
      ...userData,
      email,
      password: hashedPassword,
      role,
    });
  
    return this.userRepository.save(newUser);
  }
  

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findByEmailWithPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['user_id', 'name', 'email', 'password'],
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  findAll() {
    return this.userRepository.find({
      relations: ['role'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { role_id, ...userData } = updateUserDto;

    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (role_id) {
      const role = await this.rolesService.findOne(role_id);
      if (!role) {
        throw new BadRequestException(`Role with id ${role_id} not found`);
      }
      user.role = role;
    }

    Object.assign(user, userData);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepository.softRemove(user);
  }
}
