import { Component, Input } from '@angular/core';
import { TramiteDTO } from "@/app/modelos/tramite.dto";
import { NotificacionDto } from "@/app/modelos/notificacion-dto";
import { Router } from '@angular/router';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-aprobacion-invima',
  templateUrl: './aprobacion-invima.component.html',
  styleUrls: ['./aprobacion-invima.component.css'],
  imports: [NgForOf],
  standalone: true
})
export class AprobacionInvimaComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();

  constructor(private router: Router) {}

  aprobarTramite() {
    this.tramite.estado = "APROBADO";
    alert(`El trámite "${this.tramite.numeroRadicado}" ha sido aprobado.`);
    this.router.navigate(['/concepto-satisfactorio']);
  }

  autoRequerimiento() {
    this.tramite.estado = "EN_REVISION";
    this.notificacion.mensaje = `Autorequerimiento en el trámite número: ${this.tramite.numeroRadicado}`;
    this.notificacion.fecha = new Date();
    alert(this.notificacion.mensaje);
    console.log(this.notificacion.mensaje);
  }

  rechazarTramite() {
    this.tramite.estado = "RECHAZADO";
    this.notificacion.mensaje = `Rechazado por el INVIMA el trámite número: ${this.tramite.numeroRadicado}`;
    this.notificacion.fecha = new Date();
    alert(this.notificacion.mensaje);
    console.log(this.notificacion.mensaje);
  }

  volver() {


  }
}
