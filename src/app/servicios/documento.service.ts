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

  // Método para inicializar los estados basado en el valor de `aprobado` del backend
  inicializarEstados(documentos: DocumentoDTO[]): void {
    const currentEstados = this.estadoRevisiones$.value;

    documentos.forEach((doc) => {
      // Solo inicializa el estado si no ha sido configurado previamente
      if (currentEstados[doc.id] === undefined) {
        if (doc.aprobado === true) {
          currentEstados[doc.id] = 'aprobado';
        } else if (doc.aprobado === false) {
          currentEstados[doc.id] = 'noAprobado';
        } else {
          currentEstados[doc.id] = 'noRevisado';
        }
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
    return this.http.get<DocumentoDTO[]>(`${BASE_URL}/files/listar-archivos/${id}`, { headers })
      .pipe(
        tap((documentos) => {
          this.inicializarEstados(documentos); // Inicializa solo si es necesario
        })
      );
  }

  findById(id: number, nombre: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<any>(`${BASE_URL}/files/${id}/${nombre}`, { headers });
  }

  traerComentarioDocumento(idDocumento: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    // Cambia el responseType a 'text' para manejar la respuesta como texto
    return this.http.get(`${BASE_URL}/files/comentario-documento/${idDocumento}`, { headers, responseType: 'text' });
  }


  aprobar(idTramite: number, nombre: string, idDocumento: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.post<any>(`${BASE_URL}/files/aprobar-documento/${idTramite}/${nombre}`, {}, { headers })
      .pipe(
        tap(() => this.actualizarEstadoRevision(idDocumento, 'aprobado'))
      );
  }

  getDocumentosCorregir(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.get<any>(`${BASE_URL}/files/documentos-a-corregir/${id}`, { headers });
  }

  rechazar(idTramite: number, nombre: string, idDocumento: number, comentario: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json' // Asegura que el contenido sea JSON
    });

    // Incluye el comentario en el cuerpo de la solicitud
    const body = { comentario };

    return this.http.post<any>(`${BASE_URL}/files/negar-documento/${idTramite}/${nombre}`, body, { headers })
      .pipe(
        tap(() => this.actualizarEstadoRevision(idDocumento, 'noAprobado'))
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

  eliminarDocumento(idTramite: number, fileName: String, idDocumento: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    return this.http.delete<any>(`${BASE_URL}/files/eliminar-archivo/${idTramite}/${fileName}/${idDocumento}`, { headers});
  }
}
