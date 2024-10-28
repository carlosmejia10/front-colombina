import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Solicitud } from '../modelos/solicitud';
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

  findAll(): Observable<SolicitudDTO[]> {
    return this.http.get<SolicitudDTO[]>(this.apiUrl, { headers: this.headers });
  }

  findById(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }

  addSolicitudDEI(solicitudDEI: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl + '/add', solicitudDEI);
  }

  updateSolicitudDEI(solicitudDEI: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(
      `${this.apiUrl}/${solicitudDEI.id}`,
      solicitudDEI
    );
  }
}
