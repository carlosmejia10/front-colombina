import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Pago } from "../modelos/pago";

@Injectable({
  providedIn: 'root'
})
export class PagoPSEService {
  private apiUrl = "http://localhost:8080/api/pagos-pse";

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl+"/all");
  }

  findById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  addPago(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl+"/add", pago);
  }

  updatePago(pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/${pago.idPago}`, pago);
  }
}
