import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TramiteDTO } from '../modelos/tramite.dto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BASE_URL } from '../config/environment/urls';
import { EditarTramiteDTO } from '../modelos/editarTramiteDTO';

@Injectable({
  providedIn: 'root',
})
export class TramiteRegulatorioService {
  

  private apiUrl = `${BASE_URL}/tramite`;
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

  getTramite(id: number): Observable<EditarTramiteDTO> {
    return this.http.get<EditarTramiteDTO>(`${this.apiUrl}/${id}`);
  }

  

  actualizarTramite(id: number, tramite: EditarTramiteDTO): Observable<EditarTramiteDTO> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Enviando datos:', tramite.toJSON());
    return this.http.put<EditarTramiteDTO>(`${this.apiUrl}/${id}`, tramite.toJSON(), { headers });
  }

}

