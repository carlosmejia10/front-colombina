import {Component, Input} from '@angular/core';
import {TramiteDTO} from "@/app/modelos/tramite.dto";
import {NotificacionDto} from "@/app/modelos/notificacion-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-revision-preliminar',
  standalone: true,
  imports: [],
  templateUrl: './revision-preliminar.component.html',
  styleUrl: './revision-preliminar.component.css'
})
export class RevisionPreliminarComponent {

  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();

  constructor(private router: Router) {}

  resuelve(){
    this.tramite.estado = "EN_REVISION";
    this.router.navigate(['/info-control', this.tramite.numeroRadicado]);

  }

  solicitanteArregla(){
    this.tramite.estado = "EN_REVISION";
    this.router.navigate(['/info-control', this.tramite.numeroRadicado]);
  }

  volver(){}
}
