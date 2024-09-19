import { Controller, Get, Param } from '@nestjs/common';
import { ServicesCiesService } from './cies-services.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ROLES } from 'src/common/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Services CIES')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE)
@Controller('services-cies')
export class ServicesCiesController {
  constructor(private readonly servicesCiesService: ServicesCiesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los servicios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los servicios obtenida exitosamente.' })
  getAllServices() {
    return this.servicesCiesService.getAllServices();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Obtener todas las categorías de servicios' })
  @ApiResponse({ status: 200, description: 'Lista de categorías de servicios obtenida exitosamente.' })
  getServiceCategories() {
    return this.servicesCiesService.getServiceCategories();
  }

  @Get('services/:category_id')
  @ApiOperation({ summary: 'Obtener servicios por ID de categoría' })
  @ApiParam({ name: 'category_id', description: 'ID de la categoría de servicios' })
  @ApiResponse({ status: 200, description: 'Servicios obtenidos por ID de categoría exitosamente.' })
  getServicesByCategory(@Param('category_id') id_categoria: number) {
    return this.servicesCiesService.getServicesByCategory(id_categoria);
  }

  @Get('medics/:service_id')
  @ApiOperation({ summary: 'Obtener médicos por ID de servicio' })
  @ApiParam({ name: 'service_id', description: 'ID del servicio' })
  @ApiResponse({ status: 200, description: 'Médicos obtenidos por ID de servicio exitosamente.' })
  getMedicsByService(@Param('service_id') id_servicio: number) {
    return this.servicesCiesService.getMedicsByService(id_servicio);
  }

  @Get('servicesMedic/:medic_id')
  @ApiOperation({ summary: 'Obtener servicios por ID de médico' })
  @ApiParam({ name: 'medic_id', description: 'ID del médico' })
  @ApiResponse({ status: 200, description: 'Servicios obtenidos por ID de médico exitosamente.' })
  getServicesByMedic(@Param('medic_id') id_medico: number) {
    return this.servicesCiesService.getServicesByMedic(id_medico);
  }
}
