import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { NgFor } from '@angular/common';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-revision-documentacion',
  standalone: true,
  imports: [NgFor],
  templateUrl: './revision-documentacion.component.html',
  styleUrls: ['./revision-documentacion.component.css'], // Corrige styleUrl a styleUrls
})
export class RevisionDocumentacionComponent implements OnInit {
  // Implementa OnInit
  documentos: DocumentoDTO[] = []; // Inicializa como un array vacío
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
          console.log('Documentos cargados:', this.documentos);
          this.documentos.forEach((doc) => {
            console.log('ID del documento:', doc.id); // Asegúrate de que los IDs son válidos
          });
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

  revisarDocumento(documentoname: string): void {
    console.log('ID del documento a revisar:', documentoname);
    if (documentoname) {
      this.router.navigate(['/revision', this.id, documentoname]);
    } else {
      console.error('documento no es válido:', documentoname);
    }
  }

  continuar() {
    if (!this.documentosAprobados) {
      alert('Debes aprobar todos los documentos para continuar');
      return;
    }
    this.router.navigate([`/info-control/${this.id}`]);
  }

  regresar() {
    this.router.navigate(['/solicitudes']); // Redirige al componente de InfoTramite
  }
}
