import {Component, Input} from '@angular/core';
import {TramiteDTO} from "@/app/modelos/tramite.dto";
import {NotificacionDto} from "@/app/modelos/notificacion-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-concepto-satisfactorio',
  standalone: true,
  imports: [],
  templateUrl: './concepto-satisfactorio.component.html',
  styleUrl: './concepto-satisfactorio.component.css'
})
export class ConceptoSatisfactorioComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();

  constructor(private router: Router) {}

  conceptoSatisfactorio() {
    this.tramite.estado = "APROBADO";
    alert(`El trámite "${this.tramite.numeroRadicado}" ha obtenido concepto satisfactorio.`);
    this.router.navigate(['/tabla-tramite', this.tramite.numeroRadicado]);
  }

  autoRequerimiento() {
    this.tramite.estado = "RECHAZADO";
    alert(this.notificacion.mensaje);
    this.router.navigate(['/documentos', this.tramite.numeroRadicado]);
  }


  volver() {

  }

}
