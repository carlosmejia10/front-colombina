import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadisticasDTO } from '../modelos/estadisticas-dto';
import { BASE_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private baseUrl = `${BASE_URL}/tramites`

  constructor(private http: HttpClient) { }

  // Consulta al backend NUEVO
  getChartData(queGraficar: string, enFuncionDe: string): Observable<any> {
    return this.http.get<any>(`/api/charts?queGraficar=${queGraficar}&enFuncionDe=${enFuncionDe}`);
  }

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
