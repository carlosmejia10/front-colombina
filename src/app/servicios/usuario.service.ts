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

  findAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]> (this.baseUrl);
  }

  findByUsername(usuario: string): Observable<Usuario> {
    const token = this.authService.getToken(); // Obtener el token desde localStorage
        const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
     });
    
    return this.http.get<Usuario>(`${this.baseUrl}/${usuario}`, { headers });
  }
  /*
  findByCredenciales(credencial:string):Observable<Usuario>{
    return this.http.post<Usuario> ("http.//localhost:8080/api/usuarios",credencial);
  }
  */
}
