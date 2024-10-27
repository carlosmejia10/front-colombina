import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DocumentoService } from '@/app/servicios/documento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documento-escogido',
  standalone: true,
  imports: [],
  templateUrl: './documento-escogido.component.html',
  styleUrl: './documento-escogido.component.css'
})
export class DocumentoEscogidoComponent {

  documento = {
    name: 'Nombre del Documento',
    tipo: 'Tipo de Documento',
    aprobado: false,
    cumpleNormativas: true,
  };

  constructor(private router: Router,private location: Location, private documentoService: DocumentoService) {}

  aprobarORechazar(aprobado: boolean) {
    this.documento.aprobado = aprobado;
  
    const estado = aprobado ? 'aprobado' : 'rechazado';
    alert(`El documento "${this.documento.name}" ha sido ${estado}.`);
  
    this.router.navigate(['/documentos']);
  }

  
}
