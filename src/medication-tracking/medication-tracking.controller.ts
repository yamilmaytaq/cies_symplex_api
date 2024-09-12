import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MedicationTrackingService } from './medication-tracking.service';
import { CreateMedicationTrackingDto } from './dto/create-medication-tracking.dto';
import { UpdateMedicationTrackingDto } from './dto/update-medication-tracking.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Medication Tracking')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('medication-tracking')
export class MedicationTrackingController {
  constructor(private readonly medicationTrackingService: MedicationTrackingService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un registro de medicación' })
  @ApiResponse({ status: 201, description: 'Registro de medicación creado exitosamente.' })
  create(@Body() createMedicationTrackingDto: CreateMedicationTrackingDto) {
    return this.medicationTrackingService.create(createMedicationTrackingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de medicación' })
  @ApiResponse({ status: 200, description: 'Lista de registros de medicación obtenida exitosamente.' })
  findAll() {
    return this.medicationTrackingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de medicación por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de medicación' })
  @ApiResponse({ status: 200, description: 'Registro de medicación encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro de medicación no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.medicationTrackingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro de medicación por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de medicación' })
  @ApiResponse({ status: 200, description: 'Registro de medicación actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Registro de medicación no encontrado.' })
  update(@Param('id') id: string, @Body() updateMedicationTrackingDto: UpdateMedicationTrackingDto) {
    return this.medicationTrackingService.update(+id, updateMedicationTrackingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro de medicación por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de medicación' })
  @ApiResponse({ status: 200, description: 'Registro de medicación eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Registro de medicación no encontrado.' })
  remove(@Param('id') id: string) {
    return this.medicationTrackingService.remove(+id);
  }
}
