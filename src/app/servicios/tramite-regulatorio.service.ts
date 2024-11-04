import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../config/environment/urls';
import { TramiteDTO } from '../modelos/tramite.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TramiteService {
  private ApiUrl = '${environment.ApiUrl}/tramite';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para generar encabezados con el token dinámicamente
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(): Observable<TramiteDTO[]> {
    return this.http.get<TramiteDTO[]>(`${BASE_URL}/tramites/todos`, {
      headers: this.getHeaders(),
    });
  }

  findById(id: number): Observable<TramiteDTO> {
    return this.http.get<TramiteDTO>(`${BASE_URL}/tramites/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addTramite(tramite: TramiteDTO): Observable<any> {
    return this.http.post(`${BASE_URL}/tramites`, tramite, { headers: this.getHeaders() });
  }

  updateTramite(tramite: TramiteDTO): Observable<any> {
    return this.http.put(`${BASE_URL}/tramites/update`, tramite, { headers: this.getHeaders() });
  }

  escalarTramite(idTramite: number): Observable<any> {
    return this.http.post(`${BASE_URL}/${idTramite}/escalar`, {}, { headers: this.getHeaders() });
  }
  obtenerTramite(idTramite: number): Observable<any> {
    return this.http.get(`${BASE_URL}/${idTramite}/obtener`, { headers: this.getHeaders() });
  }
  actualizarTramite(idTramite: number, tramite : any): Observable <any> {
    return this.http.put(`${this.ApiUrl}/${idTramite}/actualizar`, tramite);
  }
}
