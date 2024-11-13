import { Component, Input } from '@angular/core';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { NotificacionDto } from '@/app/modelos/notificacion-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from '@/app/app.module';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-aprobacion-invima',
  templateUrl: './aprobacion-invima.component.html',
  styleUrls: ['./aprobacion-invima.component.css'],
  imports: [AppModule, NgIf],
  standalone: true,
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
  }
}
