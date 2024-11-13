import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { UsuarioDTO } from '@/app/modelos/usuarioDTO';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { nombreCortoFlujo } from '@/app/utils/nombres-flujo';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-solicitud',
  templateUrl: './info-solicitud.component.html',
  styleUrl: './info-solicitud.component.css',
})
export class InfoSolicitudComponent {
  mostrarBoton: boolean = true;
  solicitud!: SolicitudDTO;
  solicitante!: UsuarioDTO;
  documentos!: DocumentoDTO[];

  cambiarEtapa(etapa: string): string {
    return nombreCortoFlujo(etapa);
  }

  constructor(
    private route: ActivatedRoute,
    private tramiteService: TramiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tramiteId = this.route.snapshot.paramMap.get('id');
    if (tramiteId) {
      this.getTramiteDetails(+tramiteId);
    }
  }

  // Obtiene los detalles del trámite y luego carga la entidad sanitaria
  getTramiteDetails(id: number): void {
    this.tramiteService.findById(id).subscribe((data: SolicitudDTO) => {
      this.solicitud = data;
    });
  }

  escalarTramite() {
    /*
    this.tramiteService.escalarTramite(this.tramite.id).subscribe({
      next: () => {
        alert(`El trámite con número de radicado ${this.tramite.numeroRadicado} ha sido escalado.`);
      },
      error: (err) => {
        console.error('Error al escalar el trámite', err);
        alert('Error al escalar el trámite.');
      }
    });
    */
    //eliminar despues
    alert(
      `El trámite con número de radicado ${this.solicitud.tramite.numeroRadicado} ha sido escalado.`
    );
    this.mostrarBoton = false;
  }

  continuar() {
    switch (this.solicitud.tramite.etapa) {
      case 'A2':
      case 'B2':
      case 'A3':
      case 'B3':
        this.router.navigate(['/apertura-tramite', this.solicitud.tramite.id]);
        break;
      case 'A4':
      case 'B4':
        this.router.navigate(['/documentos', this.solicitud.tramite.id]);
        break;
      case 'A5':
      case 'B5':
        this.router.navigate(['/info-control', this.solicitud.tramite.id]);
        break;
      case 'A6':
      case 'B6':
        this.router.navigate(['/seguimiento-tramite', this.solicitud.tramite.id]);
        break;
      case 'A7':
      case 'B7':
        this.router.navigate(['/finalizacion', this.solicitud.tramite.id]);
        break;
      case 'A9':
        this.router.navigate(['/concepto-satisfactorio', this.solicitud.tramite.id]);
        break;
    }
  }
}
