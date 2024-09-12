import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';  // Añadimos ApiBearerAuth para Swagger
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Roles')
@ApiBearerAuth()  // Esto es solo para documentación en Swagger
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Solo un administrador puede crear un nuevo rol
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol' })
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  // Solo un administrador puede obtener la lista de roles
  @Get()
  @Auth(ROLES.ADMIN_ROLE)  // Solo admin puede acceder a este recurso
  @ApiOperation({ summary: 'Obtener todos los roles' })
  @ApiResponse({ status: 200, description: 'Lista de roles obtenida exitosamente.' })
  findAll() {
    return this.rolesService.findAll();
  }

  // Solo un administrador puede obtener un rol por ID
  @Get(':id')
  @Auth(ROLES.ADMIN_ROLE)  // Protegido con rol de admin
  @ApiOperation({ summary: 'Obtener un rol por ID' })
  @ApiParam({ name: 'id', description: 'ID del rol', type: 'number' })
  @ApiResponse({ status: 200, description: 'Rol encontrado.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  // Solo un administrador puede actualizar un rol
  @Patch(':id')
  @Auth(ROLES.ADMIN_ROLE)  // Protegido con rol de admin
  @ApiOperation({ summary: 'Actualizar un rol por ID' })
  @ApiParam({ name: 'id', description: 'ID del rol', type: 'number' })
  @ApiResponse({ status: 200, description: 'Rol actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  // Solo un administrador puede eliminar un rol
  @Delete(':id')
  @Auth(ROLES.ADMIN_ROLE)  // Protegido con rol de admin
  @ApiOperation({ summary: 'Eliminar un rol por ID' })
  @ApiParam({ name: 'id', description: 'ID del rol', type: 'number' })
  @ApiResponse({ status: 200, description: 'Rol eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Rol no encontrado.' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
