import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TramiteDTO } from '../modelos/tramite.dto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BASE_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root',
})
export class TramiteService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  findAll(): Observable<TramiteDTO[]> {
    const token = this.authService.getToken(); // Obtener el token desde localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<TramiteDTO[]>(`${BASE_URL}/tramites/todos`, {
      headers,
    });
  }

  /*findById(id:number):Observable<Tramite>{
        return this.http.get<Tramite> ("http.//localhost:8090/api/tramites"+id);
    }

    addTramite(tramite:Tramite){
        this.http.post("http.//localhost:8090/api/tramites",tramite).subscribe;
    }

    updateTramite(tramite:Tramite){
        this.http.put("http.//localhost:8090/api/tramites/update",tramite).subscribe;
    }
    escalarTramite(idTramite: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/${idTramite}/escalar`, {});
    }*/
}
