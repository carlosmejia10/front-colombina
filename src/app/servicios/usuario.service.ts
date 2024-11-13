import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { BASE_URL } from '../config/environment/urls';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = `${BASE_URL}/usuario`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  // Método para actualizar el estado del trámite con cabeceras de autenticación definidas en línea
  updateTramiteStatus(idTramite: number, status: string, rejectionReason?: string): Observable<any> {
    const body = { status, rejectionReason };
    
    // Definir las cabeceras directamente en la llamada
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`, // Obtén el token de authService
      'Content-Type': 'application/json'
    });

    return this.http.put(`${BASE_URL}/tramites/${idTramite}/update-status`, body, { headers });
  }

  findByUsername(usuario: string): Observable<Usuario> {
    const token = this.authService.getToken(); // Obtener el token desde AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<Usuario>(`${this.baseUrl}/${usuario}`, { headers });
  }

  // Puedes eliminar este código comentado si no lo necesitas
  /*
  findByCredenciales(credencial: string): Observable<Usuario> {
    return this.http.post<Usuario>("http://localhost:8080/api/usuarios", credencial);
  }
  */
}
