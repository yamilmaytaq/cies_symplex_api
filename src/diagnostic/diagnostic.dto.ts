import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class PreguntaDto {
  @ApiProperty({
    example: ['Sí', 'No', 'Sí'],
    description: 'Respuestas anteriores dadas por el usuario. Si es la primera pregunta, este campo puede ser null o vacío.',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })  // Cada elemento del array debe ser string
  preguntasAnteriores: string[] | null;

  @ApiProperty({
    example: 'Sí',
    description: 'Respuesta a la pregunta actual.',
    required: false,
  })
  @IsString()
  @IsOptional()  // Para que la primera vez no sea obligatorio
  respuestaActual: string | null;  // Última respuesta proporcionada por el usuario
}

export class DiagnosticoDto {
    @ApiProperty({
      example: ['Sí', 'No', 'Sí'],
      description: 'Respuestas dadas por el usuario en todas las preguntas previas',
    })
    @IsArray()
    @IsString({ each: true })  // Cada elemento del array debe ser string
    respuestas: string[];
  }