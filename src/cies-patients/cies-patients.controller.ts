import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './cies-patients.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ROLES } from 'src/common/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Patients CIES')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE)
@Controller('patients-cies')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pacientes desde el backend externo' })
  @ApiResponse({ status: 200, description: 'Lista de pacientes obtenida exitosamente.' })
  getPacientes() {
    return this.patientsService.getPatients();
  }

  @Get('patient/:id')
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado.' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado.' })
  findOne(@Param('id') id: number) {
    return this.patientsService.getPatientById(id);
  }

  @Get('patientEvolution/:id')
  @ApiOperation({ summary: 'Obtener evolución del paciente por ID' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Evolución del paciente encontrada.' })
  @ApiResponse({ status: 404, description: 'Evolución del paciente no encontrada.' })
  getPatientEvolution(@Param('id') id: number) {
    return this.patientsService.getPatientEvolution(id);
  }

  @Get('patientMedicHistory/:id')
  @ApiOperation({ summary: 'Obtener historia clínica del paciente por ID' })
  @ApiParam({ name: 'id', description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Historia clínica del paciente encontrada.' })
  @ApiResponse({ status: 404, description: 'Historia clínica del paciente no encontrada.' })
  getPatientHistory(@Param('id') id: number) {
    return this.patientsService.getPatientHistory(id);
  }
}
