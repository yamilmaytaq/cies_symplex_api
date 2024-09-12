import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';  // Importamos el decorador Auth
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ROLES.ADMIN_ROLE)
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }


  @Delete(':id')
  @Auth(ROLES.ADMIN_ROLE)
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
