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

  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(): Observable<TramiteDTO[]> {
    return this.http.get<TramiteDTO[]>(`${BASE_URL}/tramites/todos`, {headers: this.headers});
  }

  findById(id: number): Observable<TramiteDTO> {
    return this.http.get<TramiteDTO>(`${BASE_URL}/tramites/${id}`, { headers: this.headers });
  }


  addTramite(tramite:TramiteDTO){
    this.http.post("http.//localhost:8090/api/tramites",tramite).subscribe;
  }

  updateTramite(tramite:TramiteDTO){
    this.http.put("http.//localhost:8090/api/tramites/update",tramite).subscribe;
  }
  escalarTramite(idTramite: number): Observable<any> {
    return this.http.post(`${BASE_URL}/${idTramite}/escalar`, {});
  }
}
