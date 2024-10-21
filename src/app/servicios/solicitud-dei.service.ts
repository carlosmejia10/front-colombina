import { HttpClient } from "@angular/common/http";
import { Solicitud } from "../modelos/solicitud";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDEIService {
  private apiUrl = "http://localhost:8080/api/solicitudes-dei";

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl+"/all");
  }

  findById(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }

  addSolicitudDEI(solicitudDEI: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl+"/add", solicitudDEI);
  }

  updateSolicitudDEI(solicitudDEI: Solicitud): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/${solicitudDEI.id}`, solicitudDEI);
  }
}
