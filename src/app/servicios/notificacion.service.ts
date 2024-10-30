import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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
  private apiUrl = 'http://localhost:8080/notificacion';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener todas las notificaciones de un usuario
  obtenerNotificacionesPorUsuario(
    usuarioId: number
  ): Observable<any> {
    const token = this.authService.getToken();
    const headers  = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.get<Notificacion[]>(`${this.apiUrl}/usuario/${usuarioId}`, { headers});
  }

  // Marcar una notificación como leída
  marcarNotificacionComoLeida(notificacionId: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/marcarLeida/${notificacionId}`,
      {}
    );
  }

  // Enviar notificación de expiración de trámite
  notificarExpiracionTramite(tramiteId: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/expiracionTramite/${tramiteId}`,
      {}
    );
  }

  // Enviar notificación de documentos faltantes
  notificarDocumentosFaltantes(
    tramiteId: number,
    documentosFaltantes: string[]
  ): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/documentosFaltantes/${tramiteId}`,
      documentosFaltantes
    );
  }
}
