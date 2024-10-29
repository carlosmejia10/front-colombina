import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Notificacion {
  id: number;
  asunto: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private apiUrl = 'http://localhost:8080/notificaciones';
  constructor(private http: HttpClient) { }

    // Obtener todas las notificaciones de un usuario
    obtenerNotificacionesPorUsuario(usuarioId: number): Observable<Notificacion[]> {
      return this.http.get<Notificacion[]>(`${this.apiUrl}/usuario/${usuarioId}`);
    }
  
    // Marcar una notificación como leída
    marcarNotificacionComoLeida(notificacionId: number): Observable<string> {
      return this.http.post<string>(`${this.apiUrl}/marcarLeida/${notificacionId}`, {});
    }
  
    // Enviar notificación de expiración de trámite
    notificarExpiracionTramite(tramiteId: number): Observable<string> {
      return this.http.post<string>(`${this.apiUrl}/expiracionTramite/${tramiteId}`, {});
    }
  
    // Enviar notificación de documentos faltantes
    notificarDocumentosFaltantes(tramiteId: number, documentosFaltantes: string[]): Observable<string> {
      return this.http.post<string>(`${this.apiUrl}/documentosFaltantes/${tramiteId}`, documentosFaltantes);
    }
}
