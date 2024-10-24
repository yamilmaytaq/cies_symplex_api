import { Controller, Post, Body } from '@nestjs/common';
import { ChatGptService } from './diagnostic.service';
import { PreguntaDto } from './diagnostic.dto';  // Importamos el DTO
import { DiagnosticoDto } from './diagnostic.dto';  // Importamos el DTO

@Controller('diagnostico')
export class DiagnosticoController {
  constructor(private readonly chatGptService: ChatGptService) {}

  // Endpoint para obtener la primera o subsiguientes preguntas
  @Post('pregunta')
  async obtenerPregunta(@Body() preguntaDto: PreguntaDto) {
    const { preguntasAnteriores, respuestaActual } = preguntaDto;
    const pregunta = await this.chatGptService.obtenerPregunta(preguntasAnteriores, respuestaActual);
    return { pregunta };
  }

  // Endpoint para obtener el diagnóstico final
  @Post('diagnostico-final')
  async obtenerDiagnostico(@Body() diagnosticoDto: DiagnosticoDto) {
    const { respuestas } = diagnosticoDto;
    const diagnostico = await this.chatGptService.obtenerDiagnostico(respuestas);
    return { diagnostico };
  }
}