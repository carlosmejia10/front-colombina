import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { Pago } from "../modelos/pago";
import { BASE_URL } from "../config/environment/urls";

@Injectable({
  providedIn: 'root'
})
export class PagoPSEService {
  private apiUrl = `${BASE_URL}/api/pagos-pse`;

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
    return this.http.put<Pago>(`${this.apiUrl}/${pago.id}`, pago);
  }
}
