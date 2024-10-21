import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Seguimiento } from "../modelos/seguimiento";

@Injectable({
  providedIn: 'root'
})
export class SeguimientoTramiteService {
  private apiUrl = "http://localhost:8080/api/seguimientos-tramites";

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<Seguimiento[]> {
    return this.http.get<Seguimiento[]>(this.apiUrl+"/all");
  }

  findById(id: number): Observable<Seguimiento> {
    return this.http.get<Seguimiento>(`${this.apiUrl}/${id}`);
  }

  addSeguimiento(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.http.post<Seguimiento>(this.apiUrl+"/add", seguimiento);
  }

  updateSeguimiento(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.http.put<Seguimiento>(`${this.apiUrl}/${seguimiento.id}`, seguimiento);
  }
}
