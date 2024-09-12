import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user-preferences.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preferences.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('User Preferences')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('user-preferences')
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una preferencia de usuario' })
  @ApiResponse({ status: 201, description: 'Preferencia de usuario creada exitosamente.' })
  create(@Body() createUserPreferenceDto: CreateUserPreferenceDto) {
    return this.userPreferencesService.create(createUserPreferenceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las preferencias de usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de preferencias obtenida exitosamente.' })
  findAll() {
    return this.userPreferencesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una preferencia de usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID de la preferencia de usuario' })
  @ApiResponse({ status: 200, description: 'Preferencia encontrada.' })
  @ApiResponse({ status: 404, description: 'Preferencia no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.userPreferencesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una preferencia de usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID de la preferencia de usuario' })
  @ApiResponse({ status: 200, description: 'Preferencia actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Preferencia no encontrada.' })
  update(@Param('id') id: string, @Body() updateUserPreferenceDto: UpdateUserPreferenceDto) {
    return this.userPreferencesService.update(+id, updateUserPreferenceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una preferencia de usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID de la preferencia de usuario' })
  @ApiResponse({ status: 200, description: 'Preferencia eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Preferencia no encontrada.' })
  remove(@Param('id') id: string) {
    return this.userPreferencesService.remove(+id);
  }
}
