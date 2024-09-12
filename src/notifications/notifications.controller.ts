import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notifications.dto';
import { UpdateNotificationDto } from './dto/update-notifications.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Notifications')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una notificación' })
  @ApiResponse({ status: 201, description: 'Notificación creada exitosamente.' })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las notificaciones' })
  @ApiResponse({ status: 200, description: 'Lista de notificaciones obtenida exitosamente.' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una notificación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la notificación' })
  @ApiResponse({ status: 200, description: 'Notificación encontrada.' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una notificación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la notificación' })
  @ApiResponse({ status: 200, description: 'Notificación actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada.' })
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una notificación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la notificación' })
  @ApiResponse({ status: 200, description: 'Notificación eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada.' })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
