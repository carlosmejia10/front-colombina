import { Component, Input } from '@angular/core';
import { TramiteDTO } from "@/app/modelos/tramite.dto";
import { NotificacionDto } from "@/app/modelos/notificacion-dto";
import { Router } from "@angular/router";

@Component({
  selector: 'app-aprobacion-solicitante',
  standalone: true,
  imports: [],
  templateUrl: './aprobacion-solicitante.component.html',
  styleUrls: ['./aprobacion-solicitante.component.css']  // Cambiado a styleUrls
})
export class AprobacionSolicitanteComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();

  constructor(private router: Router) {}

  aprobarReclamacion() {
    this.tramite.estado = "APROBADO";
    alert(`El trámite "${this.tramite.numeroRadicado}" ha sido aprobado.`);
    this.router.navigate(['/concepto-satisfactorio', this.tramite.numeroRadicado]);
  }

  rechazarTramite() {
    this.tramite.estado = "RECHAZADO";
    this.notificacion.mensaje = `Rechazado por el INVIMA el trámite número: ${this.tramite.numeroRadicado}`;
    this.notificacion.fecha = new Date();
    alert(this.notificacion.mensaje);
    console.log(this.notificacion.mensaje);
    this.router.navigate(['/concepto-satisfactorio', this.tramite.numeroRadicado]);
  }

  volver() {
    // Navegar a la página anterior
    window.history.back();
  }
}
