import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';

@Component({
  selector: 'app-info-control',
  templateUrl: './info-control.component.html',
  styleUrls: ['./info-control.component.css'],
})
export class InfoControlComponent implements OnInit {
  solicitud!: SolicitudDTO; // Trámite seleccionado
  fechaTerminacion!: string; // Nueva variable para la fecha de terminación calculada

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tramiteService: TramiteService,
  ) {}

  ngOnInit(): void {
    const tramiteId = this.route.snapshot.paramMap.get('id');
    if (tramiteId) {
      this.getTramiteDetails(+tramiteId);
    }
  }

  // Obtener los detalles del trámite y cargar la entidad sanitaria utilizando el ID
  getTramiteDetails(id: number): void {
    this.tramiteService.findById(id).subscribe(
      (data: SolicitudDTO) => {
        this.solicitud = data;
        console.log('Trámite:', this.solicitud);

        // Calcular la fecha de terminación sumando un mes a la fecha de solicitud
        if (this.solicitud.fechaSolicitud) {
          const fechaSolicitud = new Date(this.solicitud.fechaSolicitud);
          fechaSolicitud.setMonth(fechaSolicitud.getMonth() + 1);
          this.fechaTerminacion = fechaSolicitud.toISOString().split('T')[0]; // Formato 'yyyy-MM-dd'
        }
      },
      (error) => {
        console.error('Error al cargar el trámite:', error);
      }
    );
  }

  submit(): void {
    alert('Formulario enviado correctamente.');
    this.router.navigate(['/documentos']);
  }
}
