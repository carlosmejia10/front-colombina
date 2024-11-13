import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError, Observable } from 'rxjs';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';

@Component({
  selector: 'app-revision-documentacion',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './revision-documentacion.component.html',
  styleUrls: ['./revision-documentacion.component.css'],
})
export class RevisionDocumentacionComponent implements OnInit {
  documentos: DocumentoDTO[] = [];
  estadosDocumentos: { [id: number]: 'aprobado' | 'noAprobado' | 'noRevisado' } = {};
  idTramite: number = 0;
  documentosAprobados: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentoService: DocumentoService,
    private tramiteService: TramiteService
  ) {}

  ngOnInit() {
    // Obtener el ID del trámite de la ruta
    this.idTramite = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idTramite) {
      // Cargar los documentos relacionados con el trámite
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

      // Verificar si los documentos están aprobados
      this.documentoService.aprobados(this.idTramite).subscribe((data) => {
        this.documentosAprobados = data.aprobados === data.total;
      });
    } else {
      console.error('ID no encontrado en la ruta');
    }
  }

  // Método para obtener documentos
  getDocumentos(idTramite: number): Observable<DocumentoDTO[]> {
    return this.documentoService.findAll(idTramite).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Error al obtener documentos'));
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
      this.router.navigate(['/revision', this.idTramite, documentoname, documentoId]);
    } else {
      console.error('Documento no es válido:', documentoname);
    }
  }

  // Continuar al siguiente componente
  continuar() {
    if (this.documentosAprobados) {
      this.tramiteService.findById(this.idTramite).subscribe(
        (data) => {
          const etapa = data.tramite.etapa; // Obtener la etapa del trámite
          console.log('Etapa obtenida:', etapa);

          // Navegar al FormularioGeneralComponent con el ID y la etapa
          this.router.navigate([`/formulario-general/${this.idTramite}/${etapa}`]);
        },
        (error) => {
          console.error('Error al obtener la etapa del trámite:', error);
          alert('Error al obtener la etapa del trámite. Inténtelo de nuevo.');
        }
      );
    } else {
      alert('Debes aprobar todos los documentos para continuar.');
    }
  }

  // Regresar al listado de solicitudes
  regresar() {
    this.router.navigate(['/solicitudes']);
  }

  // Método para verificar si todos los documentos están aprobados
  checkDocumentosAprobados() {
    this.documentosAprobados = this.documentos.every(
      (doc) => this.estadosDocumentos[doc.id] === 'aprobado'
    );
  }
}
