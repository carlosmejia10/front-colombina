import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DocumentoService } from '@/app/servicios/documento.service';

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

  constructor(private location: Location, private documentoService: DocumentoService) {}

  aprobar() {
    // Aquí puedes manejar la lógica para aprobar el documento
    this.documento.aprobado = true;
    
    // Muestra un mensaje o alerta (puedes cambiar esto a una notificación más elaborada)
    alert(`El documento "${this.documento.name}" ha sido aprobado.`);

    // Regresa a la página anterior
    this.location.back();
  }

  rechazar() {
    // Aquí puedes manejar la lógica para rechazar el documento
    this.documento.aprobado = false;

    // Muestra un mensaje o alerta
    alert(`El documento "${this.documento.name}" ha sido rechazado.`);

    // Regresa a la página anterior
    this.location.back();
  }
}
