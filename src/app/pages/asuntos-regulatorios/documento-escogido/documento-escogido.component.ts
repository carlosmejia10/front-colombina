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

  documento!: DocumentoDTO;
  fileUrl!: SafeUrl;

  constructor(
    private documentoService: DocumentoService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const documentoId = this.route.snapshot.paramMap.get('id');
    const tramiteId = Number(this.route.snapshot.paramMap.get('numeroRadicado'));
    console.log('ID del documento:', documentoId);
    console.log('ID del trámite:', tramiteId);
    this.documentoService.descargarArchivo(documentoId, tramiteId as number).subscribe((file) => {
      this.createFileUrl(file);
    })
  }

  createFileUrl(file: File) {
    this.fileUrl = URL.createObjectURL(file);    
  }

  aprobarORechazar(aprobado: boolean) {
    this.documento.aprobado = aprobado;
  
    const estado = aprobado ? 'aprobado' : 'rechazado';
    alert(`El documento "${this.documento.name}" ha sido ${estado}.`);
  
    //this.router.navigate(['/documentos']);
  }
}
