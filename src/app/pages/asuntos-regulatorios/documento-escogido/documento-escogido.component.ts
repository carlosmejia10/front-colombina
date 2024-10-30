import { Component, OnInit } from '@angular/core';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { DocumentoService } from '@/app/servicios/documento.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-documento-escogido',
  standalone: true,
  imports: [CommonModule], // Asegúrate de agregar CommonModule aquí
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
    const documentoId = Number(this.route.snapshot.paramMap.get('id'));
    this.documentoService.findById(documentoId).subscribe((data) => {
      this.documento = data;
      this.createFileUrl(data.file);
    });
  }

  createFileUrl(file: File) {
    const objectUrl = URL.createObjectURL(file);
    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  }

  aprobarORechazar(aprobado: boolean) {
    this.documento.aprobado = aprobado;
  
    const estado = aprobado ? 'aprobado' : 'rechazado';
    alert(`El documento "${this.documento.name}" ha sido ${estado}.`);
  
    //this.router.navigate(['/documentos']);
  }
}
