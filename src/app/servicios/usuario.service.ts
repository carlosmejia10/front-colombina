import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';
import { BASE_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = `${BASE_URL}/api/usuarios`;

  constructor(
    private http: HttpClient
  ) { }

  findAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]> (this.baseUrl);
  }
  /*
  findByCredenciales(credencial:string):Observable<Usuario>{
    return this.http.post<Usuario> ("http.//localhost:8080/api/usuarios",credencial);
  }
  */
}
