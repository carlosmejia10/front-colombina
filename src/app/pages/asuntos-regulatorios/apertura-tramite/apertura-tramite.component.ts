import { InfoAperturaTramite } from '@/app/modelos/info-apertura-tramite.dto';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apertura-tramite',
  templateUrl: './apertura-tramite.component.html',
  styleUrl: './apertura-tramite.component.css',
})
export class AperturaTramiteComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tramiteService: TramiteService
  ) {}

  private numeroRadicado: string;
  solicitud: SolicitudDTO;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.numeroRadicado = params['numeroRadicado'];
      this.tramiteService
        .findById(parseInt(this.numeroRadicado))
        .subscribe((solicitud) => {
          this.solicitud = solicitud;
        });
    });
  }

  submit() {
    if (
      !this.solicitud.tramite.pt ||
      !this.solicitud.tramite.unidadNegocio ||
      !this.solicitud.tramite.numProyectoSap ||
      !this.solicitud.tramite.proyecto ||
      !this.solicitud.tramite.tipoModificacion
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.tramiteService
      .addInfoAperturaTramite(
        parseInt(this.numeroRadicado),
        new InfoAperturaTramite(
          this.solicitud.tramite.pt,
          this.solicitud.tramite.unidadNegocio,
          this.solicitud.tramite.numProyectoSap,
          this.solicitud.tramite.proyecto,
          this.solicitud.tramite.tipoModificacion
        )
      ).subscribe(() => {
        this.router.navigate(['/documentos', this.numeroRadicado]);
      })
  }
}
