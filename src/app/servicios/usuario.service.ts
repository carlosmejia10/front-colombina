import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  findAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]> ("http.//localhost:8080/api/usuarios");
  }
  /*
  findByCredenciales(credencial:string):Observable<Usuario>{
    return this.http.post<Usuario> ("http.//localhost:8080/api/usuarios",credencial);
  }
  */
}
