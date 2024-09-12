import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // Crear un nuevo rol
  async create(createRoleDto: CreateRoleDto) {
    const roleExists = await this.roleRepository.findOne({ where: { role_name: createRoleDto.role_name } });

    if (roleExists) {
      throw new BadRequestException(`Role with name ${createRoleDto.role_name} already exists`);
    }

    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  // Obtener todos los roles
  findAll() {
    return this.roleRepository.find();
  }

  // Buscar un rol por ID
  async findOne(role_id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { role_id } });
    if (!role) {
      throw new NotFoundException(`Role with id ${role_id} not found`);
    }
    return role;
  }
  

  // Actualizar un rol por ID
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);

    // Verificar si existe el rol a actualizar
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }

    // Verificar si el nuevo nombre de rol ya existe
    if (updateRoleDto.role_name && updateRoleDto.role_name !== role.role_name) {
      const existingRole = await this.roleRepository.findOne({ where: { role_name: updateRoleDto.role_name } });
      if (existingRole) {
        throw new BadRequestException(`Role with name ${updateRoleDto.role_name} already exists`);
      }
    }

    // Actualizar el rol
    Object.assign(role, updateRoleDto);
    return this.roleRepository.save(role);
  }

  // Eliminar un rol
  async remove(id: number) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return this.roleRepository.remove(role);
  }
}
