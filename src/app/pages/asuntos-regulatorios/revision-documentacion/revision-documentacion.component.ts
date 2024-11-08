import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError, Observable } from 'rxjs';

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
  id: number = 0;
  documentosAprobados: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentoService: DocumentoService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.getDocumentos(this.id).subscribe(
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

    this.documentoService.aprobados(this.id).subscribe((data) => {
      this.documentosAprobados = data.aprobados === data.total;
    });
  }

  getDocumentos(id: number): Observable<DocumentoDTO[]> {
    return this.documentoService.findAll(id).pipe(
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

  revisarDocumento(documentoname: string): void {
    if (documentoname) {
      this.router.navigate(['/revision', this.id, documentoname]);
    } else {
      console.error('documento no es válido:', documentoname);
    }
  }

  continuar() {
    if (this.documentosAprobados) {
      this.router.navigate([`/info-control/${this.id}`]);
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
