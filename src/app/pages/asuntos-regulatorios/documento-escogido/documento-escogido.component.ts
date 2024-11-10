import { Component, OnInit } from '@angular/core';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-documento-escogido',
  standalone: true,
  imports: [CommonModule, PdfViewerModule], // Asegúrate de agregar CommonModule aquí
  templateUrl: './documento-escogido.component.html',
  styleUrls: ['./documento-escogido.component.css'] // Corrige aquí a styleUrls
})
export class DocumentoEscogidoComponent implements OnInit { // Implementa OnInit
  tramiteId: number;
  nombreDocumento: string;
  documentId: number;
  fileUrl!: SafeUrl;
  infoDoc: any;
  fileBlob!: Blob; // Archivo en Blob para poder descargarlo

  constructor(
    private documentoService: DocumentoService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nombreDocumento = this.route.snapshot.paramMap.get('id');
    this.documentId = Number(this.route.snapshot.paramMap.get('idDocumento'));
    this.tramiteId = Number(this.route.snapshot.paramMap.get('numeroRadicado'));
    console.log('ID del documento:', this.documentId);
    console.log('Nombre del documento:', this.nombreDocumento);
    this.documentoService.descargarArchivo(this.nombreDocumento, this.tramiteId as number).subscribe((file) => {
      this.fileBlob = file; // Guarda el archivo en Blob para poder descargarlo
      this.createFileUrl(file);
    })
    this.documentoService.findById(this.tramiteId, this.nombreDocumento).subscribe((data) => {
      console.log('Documento encontrado:', data);
      this.infoDoc = data;
      console.log('Informacion del documento:', this.infoDoc);
    })
  }

  createFileUrl(file: File) {
    this.fileUrl = URL.createObjectURL(file);
  }

  // Método para descargar el archivo
  descargarDocumento() {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(this.fileBlob);
    downloadLink.download = `${this.documentId}`; // Define el nombre del archivo descargado
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href); // Libera la memoria de la URL creada
  }

  aprobarORechazar(aprobado: boolean) {
    console.log('Entra:');
    const estado = aprobado ? 'aprobado' : 'rechazado';

    if (aprobado) {
      this.documentoService.aprobar(this.tramiteId, this.nombreDocumento,this.documentId).subscribe(() => {
        alert(`El documento "${this.documentId}" ha sido ${estado}.`);
        this.router.navigate(['/documentos', this.tramiteId]);
      });
    } else {
      this.documentoService.rechazar(this.tramiteId, this.nombreDocumento, this.documentId).subscribe(() => {
        alert(`El documento "${this.documentId}" ha sido ${estado}.`);
        this.router.navigate(['/documentos', this.tramiteId]);
      })  
    }
  }

  regresar() {
    this.router.navigate(['/documentos', this.tramiteId]);
  }
}
