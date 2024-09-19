import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_CONFIG } from 'src/common/config/api-config';

@Injectable()
export class PatientsService {
  constructor(private readonly httpService: HttpService) {}

  getPatients(): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}pacientes/pacientes`)
      .pipe(map(response => response.data));
  }

  getPatientById(id: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}pacientes/paciente/${id}`)
      .pipe(map(response => response.data));
  }

  getPatientEvolution(id: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}pacientes/evolucionPaciente/${id}`)
      .pipe(
        map(response => response.data),
        catchError(err => {
          if (err.response && err.response.data && err.response.data.message) {
            return throwError(() => new InternalServerErrorException(err.response.data.message));
          }
          return throwError(() => new InternalServerErrorException('Ocurrió un error al obtener la evolución del paciente.'));
        })
      );
  }

  getPatientHistory(id: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}pacientes/historiaClinica/${id}`)
      .pipe(map(response => response.data));
  }
}
