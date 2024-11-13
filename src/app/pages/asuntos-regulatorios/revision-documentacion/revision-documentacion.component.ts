import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError, Observable } from 'rxjs';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';

@Component({
  selector: 'app-revision-documentacion',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './revision-documentacion.component.html',
  styleUrls: ['./revision-documentacion.component.css'],
})
export class RevisionDocumentacionComponent implements OnInit {
  solicitud: SolicitudDTO;
  documentos: DocumentoDTO[] = [];
  estadosDocumentos: { [id: number]: 'aprobado' | 'noAprobado' | 'noRevisado' } = {};
  idTramite: number = 0;
  documentosAprobados: boolean = false;
  estadoTramite: string = ''; // Nuevo: estado del trámite actual

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentoService: DocumentoService,
    private tramiteService: TramiteService
  ) {}

  ngOnInit() {
    this.idTramite = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idTramite) {
      this.tramiteService.findById(this.idTramite).subscribe((data: SolicitudDTO) => {
        this.solicitud = data;
        this.estadoTramite = this.solicitud.tramite.estado; // Almacena el estado del trámite
      });
      this.getDocumentos(this.idTramite).subscribe(
        (data) => {
          this.documentos = data;
          this.documentoService.inicializarEstados(this.documentos);
          this.documentos.forEach((doc) => {
            this.estadosDocumentos[doc.id] = this.documentoService.obtenerEstadoRevision(doc.id);
          });
          this.checkDocumentosAprobados();
        },
        (error) => {
          console.error('Error al cargar documentos:', error);
        }
      );
    } else {
      console.error('ID no encontrado en la ruta');
    }

    this.documentoService.aprobados(this.idTramite).subscribe((data) => {
      this.documentosAprobados = data.aprobados === data.total;
    });
  }

  getDocumentos(idTramite: number): Observable<DocumentoDTO[]> {
    return this.documentoService.findAll(idTramite).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Error al obtener documentos'));
      })
    );
  }

  eliminarDocumento(documentoId: number, fileName: string): void {
    this.documentoService.eliminarDocumento(this.idTramite, fileName, documentoId).subscribe(
      () => {
        // Elimina el documento de la lista local
        this.documentos = this.documentos.filter(doc => doc.id !== documentoId);
        delete this.estadosDocumentos[documentoId];  // Actualiza el estado
        this.checkDocumentosAprobados();  // Revisa si todos los documentos están aprobados
        console.log(`Documento "${fileName}" eliminado.`);
      },
      (error) => {
        console.error(`Error al eliminar el documento "${fileName}":`, error);
      }
    );
  }


  // Actualiza el método `getEstadoClase` para aplicar los colores según el estado del trámite y la aprobación del documento
  getEstadoClase(documentoId: number): string {
    const estadoDocumento = this.estadosDocumentos[documentoId] === 'aprobado';

    if (this.estadoTramite === 'EN_REVISION') {
      return estadoDocumento ? 'estado-aprobado' : 'estado-en-revision';
    } else if (this.estadoTramite === 'PENDIENTE') {
      return estadoDocumento ? 'estado-pendiente' : 'estado-no-aprobado';
    } else {
      return 'estado-no-revisado';
    }
  }

  revisarDocumento(documentoname: string, documentoId: number): void {
    if (documentoname) {
      this.router.navigate(['/revision', this.idTramite, documentoname, documentoId]);
    } else {
      console.error('documento no es válido:', documentoname);
    }
  }

  continuar() {
    if (this.documentosAprobados) {
      this.tramiteService.setDocumentacionRevisada(this.idTramite).subscribe(() => {
        this.router.navigate([`/formulario-general/${this.idTramite}/${this.solicitud.tramite.etapa}`]);
      });
    } else {
      alert('Debes aprobar todos los documentos para continuar.');
    }
  }

  regresar() {
    this.router.navigate(['/solicitudes']);
  }

  // Verifica si todos los documentos están aprobados (en estado "verde")
  checkDocumentosAprobados() {
    this.documentosAprobados = this.documentos.every(
      (doc) => this.estadosDocumentos[doc.id] === 'aprobado'
    );
  }
}
