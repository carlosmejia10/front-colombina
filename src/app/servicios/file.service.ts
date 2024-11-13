import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {DocumentoDTO} from "@/app/modelos/DocumentoDTO";  // Servicio para obtener el token
import { BASE_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = `${BASE_URL}/files`;  // Cambia por tu URL de backend

  constructor(private http: HttpClient, private authService: AuthService) {}  // Inyectar AuthService

  // Método para subir el archivo con autenticación (token en la cabecera)
  subirArchivo(documentoDTO: DocumentoDTO, idTramite: number): Observable<any> {
    const formData: FormData = new FormData();

    // Agregar el archivo y los demás datos a FormData
    formData.append('name', documentoDTO.nombre);
    formData.append('tipo', documentoDTO.tipo);
    formData.append('aprobado', String(documentoDTO.aprobado));  // Convertimos boolean a string
    formData.append('file', documentoDTO.file);

    // Obtener el token desde AuthService
    const token = this.authService.getToken();  // Suponemos que este método lo devuelve de localStorage

    // Configuramos las cabeceras con el token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Incluir el token en el encabezado Authorization
    });

    // Realizar la petición POST con las cabeceras
    return this.http.post(`${this.apiUrl}/subir-archivo/${idTramite}`, formData, { headers });
  }
}
