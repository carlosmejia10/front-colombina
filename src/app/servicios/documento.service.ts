import { Injectable } from '@angular/core';
import { DocumentoDTO } from '../modelos/DocumentoDTO';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BASE_URL } from '../config/environment/urls';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private headers: HttpHeaders;
  
  // Estructura para almacenar el estado de revisión de los documentos
  private estadoRevisiones$ = new BehaviorSubject<{ [id: number]: 'aprobado' | 'noAprobado' | 'noRevisado' }>({});

  constructor(private http: HttpClient, private authService: AuthService) {
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Método para obtener los estados de revisión como un observable
  getEstadosRevisiones() {
    return this.estadoRevisiones$.asObservable();
  }

  // Método para inicializar los estados en función de los documentos cargados
  inicializarEstados(documentos: DocumentoDTO[]): void {
    const currentEstados = this.estadoRevisiones$.value;
    documentos.forEach((doc) => {
      if (!(doc.id in currentEstados)) {
        currentEstados[doc.id] = 'noRevisado';
      }
    });
    this.estadoRevisiones$.next(currentEstados);
  }

  // Método para obtener el estado de revisión de un documento por su ID
  obtenerEstadoRevision(id: number): 'aprobado' | 'noAprobado' | 'noRevisado' {
    return this.estadoRevisiones$.value[id] || 'noRevisado';
  }

  // Método para actualizar el estado de revisión de un documento y emitir el cambio
  actualizarEstadoRevision(id: number, estado: 'aprobado' | 'noAprobado'): void {
    const currentEstados = this.estadoRevisiones$.value;
    currentEstados[id] = estado;
    this.estadoRevisiones$.next(currentEstados);
  }

  findAll(id: number): Observable<DocumentoDTO[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<DocumentoDTO[]>(`${BASE_URL}/files/listar-archivos/${id}`, { headers });
  }

  findById(id: number, nombre: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<any>(`${BASE_URL}/files/${id}/${nombre}`, { headers });
  }

  // Método para aprobar un documento
  aprobar(id: number, nombre: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    console.log('Aprobando documento:', id, nombre);

    return this.http.post<any>(`${BASE_URL}/files/aprobar-documento/${id}/${nombre}`, {}, { headers })
      .pipe(
        tap(() => this.actualizarEstadoRevision(id, 'aprobado'))
      );
  }

  // Método para rechazar un documento
  rechazar(id: number, nombre: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    console.log('Rechazando documento:', id, nombre);

    return this.http.post<any>(`${BASE_URL}/files/rechazar-documento/${id}/${nombre}`, {}, { headers })
      .pipe(
        tap(() => this.actualizarEstadoRevision(id, 'noAprobado'))
      );
  }

  aprobados(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<any>(`${BASE_URL}/files/${id}/aprobados`, { headers });
  }

  descargarArchivo(nombre: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<any>(`${BASE_URL}/files/descargar-archivo/${id}/${nombre}`, {
      headers,
      responseType: 'blob' as 'json',
    });
  }
}
