import {Component, Input} from '@angular/core';
import {TramiteDTO} from "@/app/modelos/tramite.dto";
import {NotificacionDto} from "@/app/modelos/notificacion-dto";
import {ActivatedRoute, Router} from "@angular/router";
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';

@Component({
  selector: 'app-concepto-satisfactorio',
  templateUrl: './concepto-satisfactorio.component.html',
  styleUrl: './concepto-satisfactorio.component.css'
})
export class ConceptoSatisfactorioComponent {
  @Input() solicitud!: SolicitudDTO;
  notificacion: NotificacionDto = new NotificacionDto();
  aprobadoSeleccionado = false;
  autorequerimientoSeleccionado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tramiteService: TramiteService
  ) {}

  ngOnInit(): void {
    const tramiteId = this.route.snapshot.paramMap.get('id');
    if (tramiteId) {
      this.getTramiteDetails(+tramiteId);
    }
  }

  getTramiteDetails(id: number): void {
    this.tramiteService.findById(id).subscribe((data: SolicitudDTO) => {
      this.solicitud = data;
    });
  }

  conceptoSatisfactorio() {
    const confirmation = window.confirm('¿Seguro que confirma la resolución de aprobación del Invima: ${this.solicitud.tramite.id}?');
    if (confirmation) {
      // El usuario ha presionado "Aceptar"
      this.solicitud.tramite.estado = "El trámite ha terminado";
      alert('El trámite ${this.solicitud.tramite.id} ha sido aprobado.');
      this.aprobadoSeleccionado = true;
      this.autorequerimientoSeleccionado = false;
      this.solicitud.tramite.estado = "APROBADO";
      this.router.navigate(['/tramite-finalizado', this.solicitud.tramite.id]);
    } else {
      // El usuario ha presionado "Cancelar"
      alert('Aprobación del trámite por el Invima ha sido cancelada.');
    }
  }

  autoRequerimiento() {
    const confirmation = window.confirm('¿Seguro quiere continuar con el rechazo del trámite: ${this.solicitud.tramite.id}?');
    if(confirmation){
      this.solicitud.tramite.estado="RECHAZADO";
      alert('El trámite ${this.solicitud.tramite.id} ha sido rechazado.')
      this.aprobadoSeleccionado = false;
      this.autorequerimientoSeleccionado = true;
      this.solicitud.tramite.estado = "RECHAZADO";
      this.router.navigate(['/revision-preliminar', this.solicitud.tramite.id]);
    } 
    else{
      alert('Rechazo del trámite cancelada.');
    }}
  volver() {
  }
}