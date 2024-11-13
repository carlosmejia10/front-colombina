import { Component, OnInit } from '@angular/core';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileService } from '@/app/servicios/file.service';

@Component({
  selector: 'app-documento-escogido',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './corregir-documento.component.html',
  styleUrls: ['./corregir-documento.component.css']
})
export class CorregirDocumentoComponent implements OnInit {
  tramiteId: number;
  nombreDocumento: string;
  documentId: number;
  fileUrl!: SafeUrl;
  selectedFile!: File;
  fileName!: string;
  errorMessage!: string;
  infoDoc: any;
  fileBlob!: Blob;
  comentario: string;

  constructor(
    private fileService: FileService,
    private documentoService: DocumentoService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.nombreDocumento = this.route.snapshot.paramMap.get('id');
    this.documentId = Number(this.route.snapshot.paramMap.get('idDocumento'));
    this.tramiteId = Number(this.route.snapshot.paramMap.get('numeroRadicado'));

    this.documentoService.descargarArchivo(this.nombreDocumento, this.tramiteId).subscribe((file) => {
      this.fileBlob = file;
      this.createFileUrl(file);
    });

    this.documentoService.findById(this.tramiteId, this.nombreDocumento).subscribe((data) => {
      this.infoDoc = data;
    });

    this.obtenerComentario();
  }

  obtenerComentario() {
    this.documentoService.traerComentarioDocumento(this.documentId).subscribe((comentario) => {
      this.comentario = comentario;
      console.log("Comentario obtenido: " + comentario);
    });
  }

  createFileUrl(file: File) {
    this.fileUrl = URL.createObjectURL(file);
  }

  descargarDocumento() {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(this.fileBlob);
    downloadLink.download = `${this.documentId}`;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.errorMessage = null;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = event.target as HTMLElement;
    uploadArea.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = event.target as HTMLElement;
    uploadArea.classList.remove('drag-over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = event.target as HTMLElement;
    uploadArea.classList.remove('drag-over');
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      this.fileName = this.selectedFile.name;
      this.errorMessage = null;
      event.dataTransfer.clearData();
    }
  }

  enviarArchivo(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Por favor seleccione un archivo antes de enviar.';
      return;
    }

    // Crear el DocumentoDTO con los datos necesarios
    const documentoDTO = new DocumentoDTO(
      false,               // Aprobado (puede ser un valor dinámico según el estado)
      true,                // CumpleNormativas (ajustar según el contexto)
      this.fileName,       // Nombre del archivo
      this.selectedFile,   // Archivo
    );

    // Enviar el DocumentoDTO a través del servicio
    this.fileService.subirArchivo(documentoDTO, this.tramiteId).subscribe(
      () => {
        alert('Archivo enviado exitosamente.');
        this.removeFile();
      },
      (error) => {
        console.error('Error al enviar archivo:', error);
        this.errorMessage = 'Error al enviar archivo. Intente nuevamente.';
      }
    );
  }

  removeFile(): void {
    this.selectedFile = null;
    this.fileName = null;
  }

  regresar() {
    this.router.navigate(['/corregir-documentos', this.tramiteId]);
  }
}
