import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SymptomTrackingService } from './symptom-tracking.service';
import { CreateSymptomTrackingDto } from './dto/create-symptom-tracking.dto';
import { UpdateSymptomTrackingDto } from './dto/update-symptom-tracking.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Symptom Tracking')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('symptom-tracking')
export class SymptomTrackingController {
  constructor(private readonly symptomTrackingService: SymptomTrackingService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un registro de síntoma' })
  @ApiResponse({ status: 201, description: 'Síntoma registrado exitosamente.' })
  create(@Body() createSymptomTrackingDto: CreateSymptomTrackingDto) {
    return this.symptomTrackingService.create(createSymptomTrackingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de síntomas' })
  @ApiResponse({ status: 200, description: 'Lista de síntomas obtenida exitosamente.' })
  findAll() {
    return this.symptomTrackingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de síntoma por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de síntoma' })
  @ApiResponse({ status: 200, description: 'Registro de síntoma encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro de síntoma no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.symptomTrackingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro de síntoma por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de síntoma' })
  @ApiResponse({ status: 200, description: 'Registro de síntoma actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Registro de síntoma no encontrado.' })
  update(@Param('id') id: string, @Body() updateSymptomTrackingDto: UpdateSymptomTrackingDto) {
    return this.symptomTrackingService.update(+id, updateSymptomTrackingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro de síntoma por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de síntoma' })
  @ApiResponse({ status: 200, description: 'Registro de síntoma eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Registro de síntoma no encontrado.' })
  remove(@Param('id') id: string) {
    return this.symptomTrackingService.remove(+id);
  }
}
