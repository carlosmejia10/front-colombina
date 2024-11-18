import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BASE_URL } from '../config/environment/urls';

interface Notificacion {
  id: number;
  mensaje: string;
  fecha: Date;
  asunto: string;
  leida: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = `${BASE_URL}/notificacion`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

    //obtener notificacion por ID
    obtenerNotificacionPorId(id: number): Observable<Notificacion> {
      return this.http.get<Notificacion>(`${this.apiUrl}/${id}`, {
        headers: this.getHeaders(),
      });
    }

  // Obtener todas las notificaciones de un usuario
  obtenerNotificacionesPorUsuario(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/usuario`, {
      headers: this.getHeaders(),
    });
  }

  obtenerNotificacionesPorUsuarioConPaginacion(page: number, size: number): Observable<Page<Notificacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<Page<Notificacion>>(`${this.apiUrl}/usuario/paginacion`, {
      headers: this.getHeaders(),
      params,
    });
  }

  // Marcar una notificación como leída
  marcarNotificacionComoLeida(notificacionId: number): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(
      `${this.apiUrl}/marcarLeida/${notificacionId}`,
      {},
      { headers: this.getHeaders() }
    );
  }


  // Enviar notificación de expiración de trámite
  notificarExpiracionTramite(tramiteId: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/expiracionTramite/${tramiteId}`,
      {},
      { headers: this.getHeaders() }
    );
  }

  // Enviar notificación de documentos faltantes
  notificarDocumentosFaltantes(
    tramiteId: number,
    documentosFaltantes: string[]
  ): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/documentosFaltantes/${tramiteId}`,
      documentosFaltantes,
      { headers: this.getHeaders() }
    );
  }
}
