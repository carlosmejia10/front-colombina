import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { EntidadSanitaria } from "../modelos/entidad-sanitaria";

@Injectable({
  providedIn: 'root'
})
export class EntidadSanitariaService {
  private apiUrl = "http://localhost:8080/api/entidades-sanitarias";

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<EntidadSanitaria[]> {
    return this.http.get<EntidadSanitaria[]>(this.apiUrl+"/all");
  }

  findById(id: number): Observable<EntidadSanitaria> {
    return this.http.get<EntidadSanitaria>(`${this.apiUrl}/${id}`);
  }

  addEntidad(entidadSanitaria: EntidadSanitaria): Observable<EntidadSanitaria> {
    return this.http.post<EntidadSanitaria>(this.apiUrl+"/add", entidadSanitaria);
  }

  updateEntidad(entidadSanitaria: EntidadSanitaria): Observable<EntidadSanitaria> {
    return this.http.put<EntidadSanitaria>(`${this.apiUrl}/${entidadSanitaria.idEntidad}`, entidadSanitaria);
  }
}
