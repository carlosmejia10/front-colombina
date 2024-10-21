import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadisticasDTO } from '../modelos/estadisticas-dto';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private baseUrl = 'http://localhost:8090/tramites'; // Ajusta la URL base según sea necesario

  constructor(private http: HttpClient) { }

  // Método para obtener trámites nacionales por mes
  getTramitesNacionalesPorMes(): Observable<EstadisticasDTO[]> {
    return this.http.get<EstadisticasDTO[]>(`${this.baseUrl}/estadisticas/nacionales`);
  }

  // Método para obtener trámites internacionales por mes
  getTramitesInternacionalesPorMes(): Observable<EstadisticasDTO[]> {
    return this.http.get<EstadisticasDTO[]>(`${this.baseUrl}/estadisticas/internacionales`);
  }

  // Método para obtener documentos devueltos por tipo
  getDocumentosDevueltosPorTipo(): Observable<EstadisticasDTO[]> {
    return this.http.get<EstadisticasDTO[]>(`${this.baseUrl}/estadisticas/documentos-devueltos`);
  }
}
