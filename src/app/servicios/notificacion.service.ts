import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { BASE_URL } from '../config/environment/urls';

interface Notificacion {
  id: number;
  asunto: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
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

  // Obtener todas las notificaciones de un usuario
  obtenerNotificacionesPorUsuario(usuarioId: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/usuario/${usuarioId}`, {
      headers: this.getHeaders(),
    });
  }

  // Marcar una notificación como leída
  marcarNotificacionComoLeida(notificacionId: number): Observable<string> {
    return this.http.post<string>(
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
