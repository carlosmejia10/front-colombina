import { Component, Input } from '@angular/core';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { NotificacionDto } from '@/app/modelos/notificacion-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';

@Component({
  selector: 'app-seguimiento-tramite',
  templateUrl: './seguimiento-tramite.component.html',
  styleUrls: ['./seguimiento-tramite.component.css'],
})
export class SeguimientoTramiteComponent {
  @Input() solicitud!: SolicitudDTO;
  notificacion: NotificacionDto = new NotificacionDto();
  aprobadoSeleccionado = false;
  rechazadoSeleccionado = false;
  numeroRadicado: string = '';
  llave: number;

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

  tramiteAprobado() {
    const confirmation = window.confirm(
      `¿Seguro quiere continuar con la aprobación de la documentación del trámite: ${this.solicitud.tramite.numeroRadicado}?`
    );
    if (confirmation) {
      // El usuario ha presionado "Aceptar"
      alert(`La documentación del trámite ${this.solicitud.tramite.numeroRadicado} ha sido aprobada.`);
      this.aprobadoSeleccionado = true;
      this.rechazadoSeleccionado = false;
      //this.router.navigate(['/asignacion-radicado-llave', this.tramite.numeroRadicado]);
    } else {
      // El usuario ha presionado "Cancelar"
      alert('Aprobación del trámite cancelada.');
    }
  }

  tramiteRechazado() {
    const confirmation = window.confirm(
      `¿Seguro quiere continuar con el rechazo de la documentación del trámite: ${this.solicitud.tramite.numeroRadicado}?`
    );
    if (confirmation) {
      alert(`La documentación del trámite ${this.solicitud.tramite.numeroRadicado} ha sido rechazada.`);
      this.aprobadoSeleccionado = false;
      this.rechazadoSeleccionado = true;
      //this.router.navigate(['/revision-preliminar', this.tramite.numeroRadicado]);
    } else {
      alert('Rechazo del trámite cancelada.');
    }
  }

  guardarInfo() {
    // Verificar que tanto númeroRadicado como llave no estén vacíos
    if (!this.numeroRadicado || !this.llave) {
      alert('Por favor, complete todos los campos antes de enviar.');
      return;
    }

    // Actualizar los atributos numeroRadicado y llave del tramite cargado
    this.solicitud.tramite.numeroRadicado = this.numeroRadicado;
    this.solicitud.tramite.llave = this.llave;

    // Llamada al servicio para actualizar el tramite
    this.tramiteService
      .updateTramite(this.solicitud.tramite.id, this.numeroRadicado, this.llave)
      .subscribe(
        (response) => {
          // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
          alert(
            `Información actualizada: Número Radicado - ${this.numeroRadicado}, Llave - ${this.llave}`
          );
        },
        (error) => {
          // Manejo de errores en caso de que la actualización falle
          console.error('Error al actualizar el trámite', error);
          alert(
            'Error al actualizar el trámite. Por favor, inténtalo de nuevo.'
          );
        }
      );
    this.router.navigate([
      '/aprobacion-entidad-sanitaria',
      this.solicitud.tramite.id,
    ]);
  }

  navigatePedirNuevoDocumento() {
    this.router.navigate(['/documentos', this.solicitud.tramite.id]);
  }

  navigateCorregirFormulario() {
    this.router.navigate(['/info-control', this.solicitud.tramite.id]);
  }
}
