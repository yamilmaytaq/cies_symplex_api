import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_CONFIG } from 'src/common/config/api-config';
import { RegisterTicket } from './entity/create-ticket.entity';

@Injectable()
export class TicketCiesService {
  constructor(private readonly httpService: HttpService) {}

  getTicketsByDate(fecha: string): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}servicios/fichas/${fecha}`)
      .pipe(map(response => response.data));
  }

  registerTicket(ticketData: RegisterTicket): Observable<any> {
    return this.httpService.post(`${API_CONFIG.BASE_URL}servicios/registrarFicha`, ticketData)
      .pipe(
        map(response => response.data),
        catchError(err => {
          if (err.response && err.response.data && err.response.data.message) {
            return throwError(() => new InternalServerErrorException(err.response.data.message));
          }
          return throwError(() => new InternalServerErrorException('Ocurrió un error al registrar la ficha.'));
        })
      );
  }

  cancelTicket(id_ficha: number): Observable<any> {
    return this.httpService.put(`${API_CONFIG.BASE_URL}servicios/cancelarFicha/${id_ficha}`, {})
      .pipe(
        map(response => response.data),
        catchError(err => {
          if (err.response && err.response.data && err.response.data.message) {
            return throwError(() => new InternalServerErrorException(err.response.data.message));
          }
          return throwError(() => new InternalServerErrorException('Ocurrió un error al cancelar la ficha.'));
        })
      );
  }
}
