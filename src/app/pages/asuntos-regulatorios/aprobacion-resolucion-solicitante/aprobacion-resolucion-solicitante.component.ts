import {Component, Input} from '@angular/core';
import {TramiteDTO} from "@/app/modelos/tramite.dto";
import {NotificacionDto} from "@/app/modelos/notificacion-dto";
import {Router} from "@angular/router";
import {AppModule} from "@/app/app.module";
import {EntidadSanitariaService} from "@/app/servicios/entidad-sanitaria.service";

@Component({
  selector: 'app-aprobacion-resolucion-solicitante',
  standalone: true,
  imports: [
    AppModule
  ],
  templateUrl: './aprobacion-resolucion-solicitante.component.html',
  styleUrl: './aprobacion-resolucion-solicitante.component.css'
})
export class AprobacionResolucionSolicitanteComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();

  constructor(
      private router: Router,
      private entidadSanitariaService: EntidadSanitariaService
  ) {}

  resolucionAprobada() {
    this.tramite.estado = "APROBADO";
    alert(`La resolución del trámite "${this.tramite.numeroRadicado}" ha sido aprobada.`);

    // Obtener entidad sanitaria por ID y redirigir basado en el país
    this.entidadSanitariaService.findById(this.tramite.entidadSanitariaId)
        .subscribe(entidadSanitaria => {
          if (entidadSanitaria.pais === 'Colombia') {
            this.router.navigate(['/concepto-satisfactorio', this.tramite.numeroRadicado]);
          } else {
            this.router.navigate(['/tabla-tramite']);
          }
        });
  }

  resolucionRechazada() {
    this.tramite.estado = "RECHAZADO";
    this.notificacion.mensaje = `Rechazada la observación del trámite: ${this.tramite.numeroRadicado}`;
    this.notificacion.fecha = new Date();
    alert(this.notificacion.mensaje);
    console.log(this.notificacion.mensaje);
    this.router.navigate(['/aprobacion-resolucion-rechazada', this.tramite.numeroRadicado]);

  }


}
