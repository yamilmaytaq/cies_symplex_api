import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG } from 'src/common/config/api-config';

@Injectable()
export class ServicesCiesService {
  constructor(private readonly httpService: HttpService) {}

  getAllServices(): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}servicios/`)
      .pipe(map(response => response.data));
  }

  getServiceCategories(): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}servicios/categorias/`)
      .pipe(map(response => response.data));
  }

  getServicesByCategory(id_categoria: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}servicios/servicios/${id_categoria}`)
      .pipe(map(response => response.data));
  }

  getMedicsByService(id_servicio: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}servicios/medicos/${id_servicio}`)
      .pipe(map(response => response.data));
  }

  getServicesByMedic(id_medico: number): Observable<any> {
    return this.httpService.get(`${API_CONFIG.BASE_URL}servicios/serviciosMedico/${id_medico}`)
      .pipe(map(response => response.data));
  }
}
