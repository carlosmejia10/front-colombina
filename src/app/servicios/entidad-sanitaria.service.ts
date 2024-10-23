import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EntidadSanitaria } from '../modelos/entidad-sanitaria';
import { BASE_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root',
})
export class EntidadSanitariaService {
  private baseUrl = `${BASE_URL}/api/entidades-sanitarias`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<EntidadSanitaria[]> {
    return this.http.get<EntidadSanitaria[]>(this.baseUrl + '/all');
  }

  findById(id: number): Observable<EntidadSanitaria> {
    return this.http.get<EntidadSanitaria>(`${this.baseUrl}/${id}`);
  }

  addEntidad(entidadSanitaria: EntidadSanitaria): Observable<EntidadSanitaria> {
    return this.http.post<EntidadSanitaria>(
      this.baseUrl + '/add',
      entidadSanitaria
    );
  }

  updateEntidad(
    entidadSanitaria: EntidadSanitaria
  ): Observable<EntidadSanitaria> {
    return this.http.put<EntidadSanitaria>(
      `${this.baseUrl}/${entidadSanitaria.id}`,
      entidadSanitaria
    );
  }
}
