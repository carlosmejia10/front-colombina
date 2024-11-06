import { Injectable } from '@angular/core';
import { DocumentoDTO } from '../modelos/DocumentoDTO';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BASE_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(id: number): Observable<DocumentoDTO[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<DocumentoDTO[]>(
      `${BASE_URL}/files/listar-archivos/${id}`,
      { headers }
    );
  }

  findById(id: number, nombre: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${BASE_URL}/files/${id}/${nombre}`, { headers });
  }

  aprobar(id: number, nombre: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log('Aprobando documento:', id, nombre);
    console.log('token:', token);
    return this.http.post<any>(
      `${BASE_URL}/files/aprobar-documento/${id}/${nombre}`,
      { headers }
    );
  }

  aprobados(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${BASE_URL}/files/${id}/aprobados`, { headers });
  }

  descargarArchivo(nombre: string, id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(
      `${BASE_URL}/files/descargar-archivo/${id}/${nombre}`,
      { headers, responseType: 'blob' as 'json' }
    );
  }
}
