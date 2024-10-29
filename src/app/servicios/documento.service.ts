import { Injectable } from '@angular/core';
import { DocumentoDTO } from '../modelos/DocumentoDTO';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BASE_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

    findAll(id:number):Observable<DocumentoDTO[]>{
      const token = this.authService.getToken(); 
      const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
      return this.http.get<DocumentoDTO[]>(`${BASE_URL}/files/listar-archivos/${id}`,{headers});
    }
}
