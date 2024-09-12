import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('Feedback')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un registro de feedback' })
  @ApiResponse({ status: 201, description: 'Registro de feedback creado exitosamente.' })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de feedback' })
  @ApiResponse({ status: 200, description: 'Lista de registros de feedback obtenida exitosamente.' })
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de feedback por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de feedback' })
  @ApiResponse({ status: 200, description: 'Registro de feedback encontrado.' })
  @ApiResponse({ status: 404, description: 'Registro de feedback no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro de feedback por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de feedback' })
  @ApiResponse({ status: 200, description: 'Registro de feedback actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Registro de feedback no encontrado.' })
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(+id, updateFeedbackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro de feedback por ID' })
  @ApiParam({ name: 'id', description: 'ID del registro de feedback' })
  @ApiResponse({ status: 200, description: 'Registro de feedback eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Registro de feedback no encontrado.' })
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
