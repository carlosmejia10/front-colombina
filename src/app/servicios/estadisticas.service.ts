import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../config/environment/urls';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private baseUrl = `${BASE_URL}/api/estadisticas/tramites`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getTramitesFiltrados(
    estado: string,
    tipoTramite: string,
    tipoProducto: string,
    pais: string,
    usuarioId: number,
    fechaRadicacion: Date
  ): Observable<any> {
    const token = this.authService.getToken(); // Obtener el token desde AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams();
    if (estado) params = params.set('estado', estado);
    if (tipoTramite) params = params.set('tipoTramite', tipoTramite);
    if (tipoProducto) params = params.set('tipoProducto', tipoProducto);
    if (pais) params = params.set('pais', pais);
    if (usuarioId) params = params.set('usuarioId', usuarioId.toString());
    if (fechaRadicacion) params = params.set('fechaRadicacion', fechaRadicacion.toISOString());

    return this.http.get<any>(this.baseUrl, { headers, params });
  }

  getChartData(queGraficar: string, enFuncionDe: string): Observable<any> {
    const token = this.authService.getToken(); // Obtener el token desde AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams()
      .set('queGraficar', queGraficar)
      .set('enFuncionDe', enFuncionDe);

    return this.http.get<any>(`${this.baseUrl}/chartData`, { headers, params });
  }
  
  getTotales(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/totales`, { headers });
  }

}
