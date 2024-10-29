import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {DocumentoService} from "@/app/servicios/documento.service";

@Component({
  selector: 'app-autorequerimiento',
  standalone: true,
  imports: [],
  templateUrl: './autorequerimiento.component.html',
  styleUrl: './autorequerimiento.component.css'
})
export class AutorequerimientoComponent {
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
