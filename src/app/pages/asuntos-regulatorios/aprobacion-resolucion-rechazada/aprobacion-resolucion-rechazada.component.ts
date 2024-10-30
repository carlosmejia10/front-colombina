import {Component, Input} from '@angular/core';
import {AppModule} from "@/app/app.module";
import {TramiteDTO} from "@/app/modelos/tramite.dto";
import {NotificacionDto} from "@/app/modelos/notificacion-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-aprobacion-resolucion-rechazada',
  standalone: true,
  imports: [
    AppModule
  ],
  templateUrl: './aprobacion-resolucion-rechazada.component.html',
  styleUrl: './aprobacion-resolucion-rechazada.component.css'
})
export class AprobacionResolucionRechazadaComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();

  constructor(private router: Router) {
  }

  aprobarSolicitud() {
    this.tramite.estado = "APROBADO";
    alert(`La resolución del tramite "${this.tramite.numeroRadicado}" ha sido aprobada.`);
    this.router.navigate(['/apertura-tramite', this.tramite.numeroRadicado]);

  }

  rechazarSolicitud() {
    this.tramite.estado = "RECHAZADO";
    this.notificacion.mensaje = `Rechazada la observación del trámite: ${this.tramite.numeroRadicado}`;
    this.notificacion.fecha = new Date();
    alert(this.notificacion.mensaje);
    console.log(this.notificacion.mensaje);
    this.router.navigate(['/tabla-tramite', this.tramite.numeroRadicado]);

  }

}
