import { Component } from '@angular/core';
import { NotificacionDto } from '@/app/modelos/notificacion-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';

@Component({
  selector: 'app-aprobacion-invima',
  templateUrl: './aprobacion-invima.component.html',
  styleUrls: ['./aprobacion-invima.component.css'],
})
export class AprobacionInvimaComponent {
  solicitud: SolicitudDTO;
  notificacion: NotificacionDto = new NotificacionDto();

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

  aprobarTramite() {
  }

  autoRequerimiento() {
  }

  rechazarTramite() {
    const confirmation = window.confirm(
      `¿Seguro quiere continuar con el rechazo del trámite: ${this.solicitud.tramite.numeroRadicado}?`
    );
    if (confirmation) {
      this.tramiteService.rechazarTramite(this.solicitud.tramite.id).subscribe(() => {
        alert(`El trámite ${this.solicitud.tramite.numeroRadicado} ha sido rechazado.`);
        this.router.navigate(['/solicitudes']);
      }, () => {
        alert('Error al rechazar el trámite.');
      });
    } else {
      alert('Rechazo del trámite cancelado.');
    }
  }
}
