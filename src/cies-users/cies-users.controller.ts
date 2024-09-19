import { Controller, Get, Param } from '@nestjs/common';
import { UsersCiesService } from './cies-users.service'; 
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ROLES } from 'src/common/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Users CIES')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE)
@Controller('users-cies')
export class UsersCiesController {
  constructor(private readonly usersCiesService: UsersCiesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios desde el backend externo' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente.' })
  getUsers() {
    return this.usersCiesService.getUsers();
  }

  @Get('medics')
  @ApiOperation({ summary: 'Obtener todos los médicos desde el backend externo' })
  @ApiResponse({ status: 200, description: 'Lista de médicos obtenida exitosamente.' })
  getMedicos() {
    return this.usersCiesService.getDoctors();
  }

  @Get('users/:user_id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'user_id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  getUserById(@Param('user_id') id_usuario: number) {
    return this.usersCiesService.getUserById(id_usuario);
  }

  @Get('schedules/:medic_id')
  @ApiOperation({ summary: 'Obtener horarios por ID de médico' })
  @ApiParam({ name: 'medic_id', description: 'ID del médico' })
  @ApiResponse({ status: 200, description: 'Horarios encontrados.' })
  @ApiResponse({ status: 404, description: 'Horarios no encontrados.' })
  getHorariosByMedicoId(@Param('medic_id') id_medico: number) {
    return this.usersCiesService.getSchedulesByDoctorsId(id_medico);
  }

  @Get('medics/:user_id')
  @ApiOperation({ summary: 'Obtener un médico por ID de usuario' })
  @ApiParam({ name: 'user_id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Médico encontrado.' })
  @ApiResponse({ status: 404, description: 'Médico no encontrado.' })
  getMedicoById(@Param('user_id') id_usuario: number) {
    return this.usersCiesService.getDoctorById(id_usuario);
  }
}
