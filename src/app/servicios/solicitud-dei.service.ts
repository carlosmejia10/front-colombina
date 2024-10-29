import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/environment/urls';
import { SolicitudDTO } from '../modelos/solicitud.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SolicitudDEIService {
  private apiUrl = `${BASE_URL}/solicitudes`;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  findBySolicitante(): Observable<SolicitudDTO[]> {
    return this.http.get<SolicitudDTO[]>(this.apiUrl, { headers: this.headers });
  }

  findAll(): Observable<SolicitudDTO[]> {
    return this.http.get<SolicitudDTO[]>(this.apiUrl+"/todos", { headers: this.headers });
  }

  findById(id: number): Observable<SolicitudDTO> {
    return this.http.get<SolicitudDTO>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  addSolicitudDEI(solicitudDEI: SolicitudDTO): Observable<SolicitudDTO> {
    return this.http.post<SolicitudDTO>(`${this.apiUrl}/add`, solicitudDEI, { headers: this.headers });
  }

  updateSolicitudDEI(solicitudDEI: SolicitudDTO): Observable<SolicitudDTO> {
    return this.http.put<SolicitudDTO>(`${this.apiUrl}/${solicitudDEI.id}`, solicitudDEI, { headers: this.headers });
  }
}
