import {Component, Input} from '@angular/core';
import {TramiteDTO} from "@/app/modelos/tramite.dto";
import {NotificacionDto} from "@/app/modelos/notificacion-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-concepto-satisfactorio',
  standalone: true,
  imports: [],
  templateUrl: './concepto-satisfactorio-solicitante.component.html',
  styleUrl: './concepto-satisfactorio-solicitante.component.css'
})
export class ConceptoSatisfactorioSolicitanteComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();

  constructor(private router: Router) {}

  aprobarResolucion() {
    this.tramite.estado = "APROBADO";
    alert(`El trámite "${this.tramite.numeroRadicado}" ha sido aprobado.`);
    this.router.navigate(['/concepto-satisfactorio', this.tramite.numeroRadicado]);
  }

  rechazarResolucion() {
    this.tramite.estado = "RECHAZADO";
    this.notificacion.mensaje = `Rechazado por el INVIMA el trámite número: ${this.tramite.numeroRadicado}`;
    this.notificacion.fecha = new Date();
    alert(this.notificacion.mensaje);
    console.log(this.notificacion.mensaje);

  }

  volver() {


  }

}
