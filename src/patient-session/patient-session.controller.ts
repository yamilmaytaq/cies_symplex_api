import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PatientSessionsService } from './patient-session.service';
import { CreatePatientSessionDto } from './dto/create-patient-session.dto';
import { UpdatePatientSessionDto } from './dto/update-patient-session.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Patient Sessions')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('patient-sessions')
export class PatientSessionsController {
  constructor(private readonly patientSessionsService: PatientSessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva sesión de paciente' })
  @ApiResponse({ status: 201, description: 'Sesión creada exitosamente.' })
  create(@Body() createPatientSessionDto: CreatePatientSessionDto) {
    return this.patientSessionsService.create(createPatientSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las sesiones de pacientes' })
  @ApiResponse({ status: 200, description: 'Lista de sesiones obtenida exitosamente.' })
  findAll() {
    return this.patientSessionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sesión por ID' })
  @ApiParam({ name: 'id', description: 'ID de la sesión' })
  @ApiResponse({ status: 200, description: 'Sesión encontrada.' })
  @ApiResponse({ status: 404, description: 'Sesión no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.patientSessionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una sesión por ID' })
  @ApiParam({ name: 'id', description: 'ID de la sesión' })
  @ApiResponse({ status: 200, description: 'Sesión actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Sesión no encontrada.' })
  update(@Param('id') id: string, @Body() updatePatientSessionDto: UpdatePatientSessionDto) {
    return this.patientSessionsService.update(+id, updatePatientSessionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una sesión por ID' })
  @ApiParam({ name: 'id', description: 'ID de la sesión' })
  @ApiResponse({ status: 200, description: 'Sesión eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Sesión no encontrada.' })
  remove(@Param('id') id: string) {
    return this.patientSessionsService.remove(+id);
  }
}
