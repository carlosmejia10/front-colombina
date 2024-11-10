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
    this.idTramite = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idTramite) {
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
        this.router.navigate([`/info-control/${this.idTramite}`]);
      });
    } else {
      alert('Debes aprobar todos los documentos para continuar.');
    }
  }

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
