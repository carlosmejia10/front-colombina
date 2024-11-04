import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EntidadSanitaria } from '../modelos/entidad-sanitaria';
import { BASE_URL } from '../config/environment/urls';
import {AuthService} from "@/app/servicios/auth.service";

@Injectable({
  providedIn: 'root',
})
export class EntidadSanitariaService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  findAll(): Observable<EntidadSanitaria[]> {
    return this.http.get<EntidadSanitaria[]>(`${BASE_URL}/entidadSanitaria/todas-entidades`, {headers: this.headers});
  }

  findById(id: number): Observable<EntidadSanitaria> {
    return this.http.get<EntidadSanitaria>(`${BASE_URL}/${id}`);
  }
}
