import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import {BASE_URL} from "@/app/config/environment/urls";  // Servicio para obtener el token

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:8080/files';  // Cambia por tu URL de backend

  constructor(private http: HttpClient, private authService: AuthService) {}  // Inyectar AuthService

  // Método para subir el archivo con autenticación (token en la cabecera)
  subirArchivo(documentoDTO: DocumentoDTO, idTramite: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', documentoDTO.name);
    formData.append('tipo', documentoDTO.tipo);
    formData.append('aprobado', String(documentoDTO.aprobado));
    formData.append('file', documentoDTO.file);

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/subir-archivo/${idTramite}`, formData, { headers });
  }

  // Método para obtener los archivos desde el backend
  obtenerArchivos(idTramite: number): Observable<DocumentoDTO[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<DocumentoDTO[]>(`${this.apiUrl}/listar-archivos/${idTramite}`, { headers });
  }

  // Método para descargar un archivo con autenticación (token en la cabecera)
  // En el servicio de descarga (ejemplo en file.service.ts)

  descargarArchivo(idTramite: number, filename: string): Observable<Blob> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${BASE_URL}/files/descargar-archivo/${idTramite}/${filename}`;
    return this.http.get(url, { responseType: 'blob', headers});
  }

}
