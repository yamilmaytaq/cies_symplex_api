import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AiPredictionsService } from './ai-predictions.service';
import { CreateAiPredictionDto } from './dto/create-ai-predictions.dto';
import { UpdateAiPredictionDto } from './dto/update-ai-predictions.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/common/constants/roles.constants';

@ApiTags('AI Predictions')
@ApiBearerAuth()
@Auth(ROLES.ADMIN_ROLE, ROLES.USER_ROLE)
@Controller('ai-predictions')
export class AiPredictionsController {
  constructor(private readonly aiPredictionsService: AiPredictionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una predicción de IA' })
  @ApiResponse({ status: 201, description: 'Predicción de IA creada exitosamente.' })
  create(@Body() createAiPredictionDto: CreateAiPredictionDto) {
    return this.aiPredictionsService.create(createAiPredictionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las predicciones de IA' })
  @ApiResponse({ status: 200, description: 'Lista de predicciones de IA obtenida exitosamente.' })
  findAll() {
    return this.aiPredictionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una predicción de IA por ID' })
  @ApiParam({ name: 'id', description: 'ID de la predicción de IA' })
  @ApiResponse({ status: 200, description: 'Predicción de IA encontrada.' })
  @ApiResponse({ status: 404, description: 'Predicción de IA no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.aiPredictionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una predicción de IA por ID' })
  @ApiParam({ name: 'id', description: 'ID de la predicción de IA' })
  @ApiResponse({ status: 200, description: 'Predicción de IA actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Predicción de IA no encontrada.' })
  update(@Param('id') id: string, @Body() updateAiPredictionDto: UpdateAiPredictionDto) {
    return this.aiPredictionsService.update(+id, updateAiPredictionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una predicción de IA por ID' })
  @ApiParam({ name: 'id', description: 'ID de la predicción de IA' })
  @ApiResponse({ status: 200, description: 'Predicción de IA eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Predicción de IA no encontrada.' })
  remove(@Param('id') id: string) {
    return this.aiPredictionsService.remove(+id);
  }
}
