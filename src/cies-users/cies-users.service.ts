import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG } from 'src/common/config/api-config';

@Injectable()
export class UsersCiesService {
  constructor(private readonly httpService: HttpService) {}

  getUsers(): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}usuarios/`)
      .pipe(map(response => response.data));
  }

  getDoctors(): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}usuarios/medicos`)
      .pipe(map(response => response.data));
  }

  getUserById(id_usuario: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}usuarios/usuario/${id_usuario}`)
      .pipe(map(response => response.data));
  }

  getSchedulesByDoctorsId(id_medico: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}usuarios/horariosID/${id_medico}`)
      .pipe(map(response => response.data));
  }

  getDoctorById(id_usuario: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}usuarios/medicoID/${id_usuario}`)
      .pipe(map(response => response.data));
  }
}
