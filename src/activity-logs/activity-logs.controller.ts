import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-logs.dto';
import { UpdateActivityLogDto } from './dto/update-activity-logs.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Activity Logs')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('activity-logs')
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un registro de actividad' })
  @ApiResponse({ status: 201, description: 'Registro de actividad creado exitosamente.' })
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogsService.create(createActivityLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de actividad' })
  @ApiResponse({ status: 200, description: 'Lista de registros de actividad obtenida exitosamente.' })
  findAll() {
    return this.activityLogsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de actividad por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de actividad' })
  @ApiResponse({ status: 200, description: 'Registro de actividad encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro de actividad no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.activityLogsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro de actividad por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de actividad' })
  @ApiResponse({ status: 200, description: 'Registro de actividad actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Registro de actividad no encontrado.' })
  update(@Param('id') id: string, @Body() updateActivityLogDto: UpdateActivityLogDto) {
    return this.activityLogsService.update(+id, updateActivityLogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro de actividad por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de actividad' })
  @ApiResponse({ status: 200, description: 'Registro de actividad eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Registro de actividad no encontrado.' })
  remove(@Param('id') id: string) {
    return this.activityLogsService.remove(+id);
  }
}
