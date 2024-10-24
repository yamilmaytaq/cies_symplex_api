import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatGptService {
  private readonly apiKey = 'TU_API_KEY_DE_OPENAI';  // Coloca aquí tu API key

  // Método para generar una nueva pregunta, ya sea inicial o basada en respuestas anteriores
  async obtenerPregunta(preguntasAnteriores: string[] | null, respuestaActual: string | null): Promise<string> {
    // Si hay una respuesta actual, agrégala a las preguntas anteriores
    if (respuestaActual && preguntasAnteriores) {
      preguntasAnteriores.push(respuestaActual);
    }
  
    let prompt: string;
  
    if (!preguntasAnteriores || preguntasAnteriores.length === 0) {
      // Si preguntasAnteriores es null o un array vacío, genera la primera pregunta
      prompt = this.generarPromptParaPrimeraPregunta();
    } else {
      // Si hay preguntas anteriores, genera una nueva pregunta basada en las respuestas
      prompt = this.generarPromptParaPregunta(preguntasAnteriores);
    }
  
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
      },
    );
  
    const { choices } = response.data;
    return choices[0].text.trim();
  }
  

  // Método para generar el diagnóstico basado en las respuestas
  async obtenerDiagnostico(respuestas: string[]): Promise<Diagnostico[]> {
    const prompt = this.generarPromptParaDiagnostico(respuestas);

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 300,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
      },
    );

    const { choices } = response.data;
    return this.procesarRespuestaDiagnostico(choices[0].text.trim());
  }

  // Prompt para la primera pregunta general relacionada con ETS
  private generarPromptParaPrimeraPregunta(): string {
    return `
      Inicia un proceso de diagnóstico médico relacionado exclusivamente con Enfermedades de Transmisión Sexual (ETS). Las respuestas del paciente solo pueden ser "Sí" o "No". Empieza con una pregunta de carácter general sobre el estado de salud sexual y comportamientos de riesgo. Basado en las respuestas, deberás hacer preguntas más específicas sobre posibles ETS.
      
      Recuerda:
      1. Solo puedes hacer preguntas relacionadas con ETS.
      2. Las respuestas solo pueden ser "Sí" o "No".
      3. La pregunta inicial debe ser de carácter general.
    `;
  }

  // Prompt para preguntas subsiguientes basadas en respuestas anteriores
  private generarPromptParaPregunta(preguntasAnteriores: string[]): string {
    const respuestasFormateadas = preguntasAnteriores
      .map((pregunta, index) => `Pregunta ${index + 1}: ${pregunta}`)
      .join('\n');

    return `
      Continúa un proceso de diagnóstico médico relacionado exclusivamente con Enfermedades de Transmisión Sexual (ETS) basado en las siguientes respuestas del paciente. Las respuestas solo pueden ser "Sí" o "No". Basado en las respuestas previas, genera una pregunta más específica relacionada con ETS para identificar una posible enfermedad.

      Ejemplo de respuestas:
      ${respuestasFormateadas}
      
      Ahora, genera una nueva pregunta más específica.
    `;
  }

  // Prompt para generar el diagnóstico basado en las respuestas
  private generarPromptParaDiagnostico(respuestas: string[]): string {
    const respuestasFormateadas = respuestas
      .map((respuesta, index) => `Pregunta ${index + 1}: ${respuesta}`)
      .join('\n');

    return `
      Con base en las siguientes respuestas a preguntas médicas relacionadas con Enfermedades de Transmisión Sexual (ETS), genera un diagnóstico que incluya 4 posibles ETS, cada una con un porcentaje de probabilidad, el nombre de la enfermedad y una breve descripción. Las respuestas solo han sido "Sí" o "No", y tu tarea es proporcionar un diagnóstico preciso basado en estas respuestas.

      Ejemplo de respuestas:
      ${respuestasFormateadas}
      
      Ahora, genera un diagnóstico con los siguientes datos:
      1. Nombre de la ETS.
      2. Porcentaje de probabilidad.
      3. Breve descripción de la enfermedad.
    `;
  }

  // Procesar el texto del diagnóstico y extraer enfermedades, porcentajes y descripciones
  private procesarRespuestaDiagnostico(texto: string): Diagnostico[] {
    const lineas = texto.split('\n');
    const diagnosticos = [];

    for (const linea of lineas) {
      const match = linea.match(/(.*?):\s*(\d+)%\s*(.*)/);
      if (match) {
        diagnosticos.push({
          enfermedad: match[1].trim(),
          porcentaje: parseInt(match[2], 10),
          descripcion: match[3].trim(),
        });
      }
    }

    return diagnosticos;
  }
}

// Interfaces para los diagnósticos
export interface Diagnostico {
  enfermedad: string;
  porcentaje: number;
  descripcion: string;
}
