import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '@/app/modelos/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private baseUrl = 'http://localhost:8080/notificacion'; // Asegúrate de que la URL base sea la correcta para tu backend

  constructor(private http: HttpClient) { }

  // Método para obtener las notificaciones de un usuario
  obtenerNotificacionesPorUsuario(usuarioId: number): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  // Método para marcar una notificación como leída
  marcarNotificacionComoLeida(notificacionId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/marcarLeida/${notificacionId}`, {});
  }
}
