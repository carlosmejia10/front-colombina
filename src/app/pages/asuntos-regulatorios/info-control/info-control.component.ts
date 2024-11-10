import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { InfoControlDTO } from '@/app/modelos/info-control.dto';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';

@Component({
  selector: 'app-info-control',
  templateUrl: './info-control.component.html',
  styleUrls: ['./info-control.component.css'],
})
export class InfoControlComponent implements OnInit {
  solicitud: SolicitudDTO; // Trámite seleccionado
  entidadSanitaria: EntidadSanitaria;
  fechaTerminacion!: string; // Nueva variable para la fecha de terminación calculada
  infoControl: any = {
    fechaTerminacion: '',
    fechaNotificacion: '',
    idSeguimiento: '',
    registroSanitario: '',
    expedienteRSA: '',
    numeroRSA: '',
    fechaVencimientoRSA: '',
    planta: '',
    numeroFactura: '',
    observaciones: '',
  }; // Nuevo objeto para el formulario de información de control

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tramiteService: TramiteService
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
        this.entidadSanitaria = this.solicitud.tramite.entidadSanitaria;

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
    if (
      !this.fechaTerminacion ||
      !this.infoControl.fechaNotificacion ||
      !this.infoControl.expedienteRSA ||
      !this.infoControl.fechaVencimientoRSA ||
      !this.infoControl.idSeguimiento ||
      !this.infoControl.numeroFactura ||
      !this.infoControl.numeroRSA ||
      !this.infoControl.observaciones ||
      !this.infoControl.planta ||
      !this.infoControl.registroSanitario
    ) {
      alert('Todos los campos son obligatorios');
      console.log(this.infoControl);
      return;
    }
    this.infoControl.fechaTerminación = new Date(this.fechaTerminacion);

    this.infoControl = new InfoControlDTO(
      this.infoControl.fechaTerminacion,
      this.infoControl.fechaNotificacion,
      this.infoControl.idSeguimiento,
      this.infoControl.registroSanitario,
      this.infoControl.expedienteRSA,
      this.infoControl.numeroRSA,
      this.infoControl.fechaVencimientoRSA,
      this.infoControl.planta,
      this.infoControl.numeroFactura,
      this.infoControl.observaciones
    );
    this.tramiteService
      .addInfoControlTramite(
        +this.route.snapshot.paramMap.get('id'),
        this.infoControl
      )
      .subscribe(() => {
        alert('Formulario enviado correctamente.');
        this.router.navigate(['/seguimiento-tramite', +this.route.snapshot.paramMap.get('id')]);
      });
  }
}
