import { Component, OnInit } from '@angular/core';
import  {Tramite, EstadoTramite} from '../../../modelos/tramite';
import { EntidadSanitaria } from '../../../modelos/entidad-sanitaria';
import { Solicitud } from '../../../modelos/solicitud';
import { Usuario } from '../../../modelos/usuario';
import { Documento } from '../../../modelos/documento';

@Component({
  selector: 'app-info-tramite',
  templateUrl: './info-tramite.component.html',
  styleUrl: './info-tramite.component.css'
})
export class InfoTramiteComponent {
  mostrarBoton:boolean=true;
  tramite!: Tramite;
  entidadSanitaria!: EntidadSanitaria;
  solicitud!: Solicitud;
  solicitante!: Usuario;
  documentos!: Documento[];

  ngOnInit(): void {
    // Datos falsos para mostrar en la pantalla
    this.solicitante = {
      id: 1,
      nombre: 'Juan Pérez',
      contrasena: '1234',
      rol: { id: 1, tipoRol: 'Administrador' },
      correoElectronico: 'juan.perez@example.com'
    };

    this.solicitud = new Solicitud(
      1,
      'Galletas',
      'Comida',
      new Date('2024-09-01'),
      'Nacional'
    );

    this.entidadSanitaria = {
      id: 1,
      nombre: 'INVIMA',
      pais: 'Colombia'
    };

    this.documentos = [
      { id: 1, tipo: 'Envío de documentación adicional', aprobado: true, tempUrl: 'http://accioneduca.org/admin/archivos/modulos/ayudanos/prueba.pdf' },
      { id: 2, tipo: 'Recepción de documentos', aprobado: false, tempUrl: 'http://accioneduca.org/admin/archivos/modulos/ayudanos/prueba.pdf' }
    ];

    this.tramite = new Tramite(
      1,
      'AR-0001-2024',
      EstadoTramite.RECHAZADO,
      new Date('2024-09-15'),
      new Date('2024-10-26'),
      this.entidadSanitaria,
      this.documentos,
      [],
      [],
      [],
      this.solicitud,
      'A'
    );
  }

  escalarTramite() {
    /*
    this.tramiteService.escalarTramite(this.tramite.id).subscribe({
      next: () => {
        alert(`El trámite con número de radicado ${this.tramite.numeroRadicado} ha sido escalado.`);
      },
      error: (err) => {
        console.error('Error al escalar el trámite', err);
        alert('Error al escalar el trámite.');
      }
    });
    */
   //eliminar despues
    alert(`El trámite con número de radicado ${this.tramite.numeroRadicado} ha sido escalado.`);
    this.mostrarBoton=false;
  }
}
