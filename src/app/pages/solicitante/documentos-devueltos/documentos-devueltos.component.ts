import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError, Observable } from 'rxjs';

@Component({
  selector: 'app-documentos-devueltos',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './documentos-devueltos.component.html',
  styleUrls: ['./documentos-devueltos.component.css'],
})
export class DocumentosDevueltosComponent implements OnInit {
  documentos: DocumentoDTO[] = [];
  estadosDocumentos: { [id: number]: 'aprobado' | 'noAprobado' | 'noRevisado' } = {};
  idTramite: number = 0;
  documentosAprobados: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentoService: DocumentoService
  ) {}

  ngOnInit() {
    // Obtener el ID del trámite desde la URL
    this.idTramite = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idTramite) {
      // Cargar los documentos devueltos que necesitan corrección
      this.getDocumentosCorregir(this.idTramite).subscribe(
        (data) => {
          this.documentos = data;
          this.documentoService.inicializarEstados(this.documentos);
          this.documentos.forEach((doc) => {
            this.estadosDocumentos[doc.id] = this.documentoService.obtenerEstadoRevision(doc.id);
          });
          this.checkDocumentosAprobados();
        },
        (error) => {
          console.error('Error al cargar documentos devueltos:', error);
        }
      );
    } else {
      console.error('ID de trámite no encontrado en la ruta');
    }
  }

  // Método para obtener documentos que necesitan corrección
  getDocumentosCorregir(idTramite: number): Observable<DocumentoDTO[]> {
    return this.documentoService.getDocumentosCorregir(idTramite).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Error al obtener documentos devueltos'));
      })
    );
  }

  // Obtener la clase de estado para los documentos
  getEstadoClase(documentoId: number): string {
    const estado = this.estadosDocumentos[documentoId];
    if (estado === 'aprobado') {
      return 'estado-aprobado';
    } else if (estado === 'noAprobado') {
      return 'estado-no-aprobado';
    } else {
      return 'estado-no-revisado';
    }
  }

  // Navegar para revisar un documento
  revisarDocumento(documentoname: string, documentoId: number): void {
    if (documentoname) {
      this.router.navigate(['/devolver', this.idTramite, documentoname, documentoId]);
    } else {
      console.error('Documento no es válido:', documentoname);
    }
  }

  // Continuar al siguiente componente si todos los documentos están aprobados
  continuar() {
    if (this.documentosAprobados) {
      this.router.navigate(['/tabla-tramite']);
    } else {
      alert('Debes aprobar todos los documentos para continuar.');
    }
  }

  // Método para verificar si todos los documentos están aprobados
  checkDocumentosAprobados() {
    this.documentosAprobados = this.documentos.every(
      (doc) => this.estadosDocumentos[doc.id] === 'aprobado'
    );
  }

  // Regresar al listado de solicitudes
  regresar() {
    this.router.navigate(['/tabla-tramite']);
  }
}
