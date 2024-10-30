import {Component, Input} from '@angular/core';
import {AppModule} from "@/app/app.module";
import {TramiteDTO} from "@/app/modelos/tramite.dto";
import {NotificacionDto} from "@/app/modelos/notificacion-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-seguimiento-tramite',
  standalone: true,
  imports: [
    AppModule
  ],
  templateUrl: './seguimiento-tramite.component.html',
  styleUrl: './seguimiento-tramite.component.css'
})
export class SeguimientoTramiteComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();

  constructor(private router: Router) {}

  tramiteAprobado() {
    this.tramite.estado = "APROBADO";
    alert(`El trámite "${this.tramite.numeroRadicado}" ha sido aprobado.`);
    this.router.navigate(['/asignacion-radicado-llave', this.tramite.numeroRadicado]);
  }

  tramiteRechazado() {
    this.tramite.estado = "RECHAZADO";
    this.router.navigate(['/revision-preliminar', this.tramite.numeroRadicado]);

  }

}
