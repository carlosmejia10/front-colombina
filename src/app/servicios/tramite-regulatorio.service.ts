import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TramiteDTO } from '../modelos/tramite.dto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BASE_URL } from '../config/environment/urls';
import { InfoAperturaTramite } from '../modelos/info-apertura-tramite.dto';
import { SolicitudDTO } from '../modelos/solicitud.dto';
import { InfoControlDTO } from '../modelos/info-control.dto';

@Injectable({
  providedIn: 'root',
})
export class TramiteService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para actualizar el estado del trámite
  updateTramiteStatus(idTramite: number, status: string, rejectionReason?: string): Observable<any> {
    const body = { status, rejectionReason }; // Cuerpo de la solicitud
    return this.http.put(`${BASE_URL}/tramites/${idTramite}/update-status`, body, {
      headers: this.getHeaders(),
    });
  }

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

  findById(id: number): Observable<SolicitudDTO> {
    return this.http.get<SolicitudDTO>(`${BASE_URL}/solicitudes/tramite/${id}`, {
      headers: this.getHeaders(),
    });
}

  

  addTramite(tramite: TramiteDTO): Observable<any> {
    return this.http.post(`${BASE_URL}/tramites`, tramite, {
      headers: this.getHeaders(),
    });
  }

  updateTramite(id: number, numeroRadicado: string, llave: number): Observable<any> {
    return this.http.post(`${BASE_URL}/tramites/${id}/aceptar?numeroRadicado=${numeroRadicado}&llave=${llave}`, null, {
      headers: this.getHeaders(),
    });
  }

  addInfoAperturaTramite(
    id: number,
    info: InfoAperturaTramite
  ): Observable<any> {
    return this.http.post(`${BASE_URL}/tramites/${id}/apertura`, info, {
      headers: this.getHeaders(),
    });
  }

  setDocumentacionRevisada(idTramite: number): Observable<any> {
    return this.http.post(
      `${BASE_URL}/tramites/${idTramite}/documentacion-revisada`,
      {},
      { headers: this.getHeaders() }
    );
  }

  addInfoControlTramite(idTramite: number, info: InfoControlDTO): Observable<any> {
    return this.http.post(
      `${BASE_URL}/tramites/${idTramite}/info-control`,
      info,
      { headers: this.getHeaders() }
    );
  }

  escalarTramite(idTramite: number): Observable<any> {
    return this.http.post(
      `${BASE_URL}/${idTramite}/escalar`,
      {},
      { headers: this.getHeaders() }
    );
  }
}
