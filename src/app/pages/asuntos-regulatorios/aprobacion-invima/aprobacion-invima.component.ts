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
  ) { }

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
    this.router.navigate(['/formulario-general', this.solicitud.tramite.id, this.solicitud.tramite.etapa], {
      relativeTo: this.route,
      queryParams: { aprobado: true },
      queryParamsHandling: 'merge',
    });
  }
  
  autoRequerimiento() {
    const confirmation = window.confirm(
      `¿Está seguro de que desea continuar con el requerimiento automático del trámite: ${this.solicitud.tramite.numeroRadicado}?`
    );
    if (confirmation) {
      this.tramiteService.cambiarEtapaTramite(this.solicitud.tramite.id, 4).subscribe(() => {
        this.router.navigate([`/documentos/${this.solicitud.tramite.id}`]);
      });
    } else {
      alert('Auto requerimiento cancelado.');
    }
  }
  
  rechazarTramite() {
    this.router.navigate(['/formulario-general', this.solicitud.tramite.id, this.solicitud.tramite.etapa], {
      relativeTo: this.route,
      queryParams: { aprobado: false },
      queryParamsHandling: 'merge',
    });
    // const confirmation = window.confirm(
    //   `¿Seguro quiere continuar con el rechazo del trámite: ${this.solicitud.tramite.numeroRadicado}?`
    // );
    // if (confirmation) {
    //   this.tramiteService.rechazarTramite(this.solicitud.tramite.id).subscribe(() => {
    //     alert(`El trámite ${this.solicitud.tramite.numeroRadicado} ha sido rechazado.`);
    //     this.router.navigate(['/solicitudes']);
    //   }, () => {
    //     alert('Error al rechazar el trámite.');
    //   });
    // } else {
    //   alert('Rechazo del trámite cancelado.');
    // }
  }
}
