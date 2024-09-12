import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { HealthMetricsService } from './health-metrics.service';
import { CreateHealthMetricDto } from './dto/create-health-metric.dto';
import { UpdateHealthMetricDto } from './dto/update-health-metric.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Health Metrics')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('health-metrics')
export class HealthMetricsController {
  constructor(private readonly healthMetricsService: HealthMetricsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva métrica de salud' })
  @ApiResponse({ status: 201, description: 'Métrica de salud creada exitosamente.' })
  create(@Body() createHealthMetricDto: CreateHealthMetricDto) {
    return this.healthMetricsService.create(createHealthMetricDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las métricas de salud' })
  @ApiResponse({ status: 200, description: 'Lista de métricas obtenida exitosamente.' })
  findAll() {
    return this.healthMetricsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una métrica de salud por ID' })
  @ApiParam({ name: 'id', description: 'ID de la métrica de salud' })
  @ApiResponse({ status: 200, description: 'Métrica encontrada.' })
  @ApiResponse({ status: 404, description: 'Métrica no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.healthMetricsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una métrica de salud por ID' })
  @ApiParam({ name: 'id', description: 'ID de la métrica de salud' })
  @ApiResponse({ status: 200, description: 'Métrica actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Métrica no encontrada.' })
  update(@Param('id') id: string, @Body() updateHealthMetricDto: UpdateHealthMetricDto) {
    return this.healthMetricsService.update(+id, updateHealthMetricDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una métrica de salud por ID' })
  @ApiParam({ name: 'id', description: 'ID de la métrica de salud' })
  @ApiResponse({ status: 200, description: 'Métrica eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Métrica no encontrada.' })
  remove(@Param('id') id: string) {
    return this.healthMetricsService.remove(+id);
  }
}
