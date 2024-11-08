import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { UsuarioDTO } from '@/app/modelos/usuarioDTO';
import { EntidadSanitariaService } from '@/app/servicios/entidad-sanitaria.service';
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
  tramite!: TramiteDTO;
  entidadSanitaria!: EntidadSanitaria;
  solicitud!: SolicitudDTO;
  solicitante!: UsuarioDTO;
  documentos!: DocumentoDTO[];

  constructor(
    private route: ActivatedRoute,
    private tramiteService: TramiteService,
    private entidadSanitariaService: EntidadSanitariaService, // Inyecta el servicio
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
    this.tramiteService.findById(id).subscribe((data: TramiteDTO) => {
      this.tramite = data;
      this.tramite.etapa = nombreCortoFlujo(data.etapa); // Cambia el nombre de la etapa
      this.getEntidadSanitariaDetails(data.entidadSanitariaId); // Llama a la función para cargar la entidad
      console.log(data);
    });
  }

  // Obtiene la entidad sanitaria completa por su ID
  getEntidadSanitariaDetails(id: number): void {
    this.entidadSanitariaService
      .findById(id)
      .subscribe((entidad: EntidadSanitaria) => {
        this.entidadSanitaria = entidad;
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
      `El trámite con número de radicado ${this.tramite.numeroRadicado} ha sido escalado.`
    );
    this.mostrarBoton = false;
  }

  continuar() {
    switch (this.tramite.etapa) {
      case 'A2':
      case 'B2':
      case 'A3':
      case 'B3':
        this.router.navigate(['/apertura-tramite', this.tramite.id]);
        break;
      case 'A4':
      case 'B4':
        this.router.navigate(['/documentos', this.tramite.id]);
        break;
      case 'A5':
        this.router.navigate(['/info-control', this.tramite.id]);
        break;
      case 'B5':
        break;
      case 'A7':
      case 'B7':
        this.router.navigate(['/finalizacion', this.tramite.id]);
        break;
      case 'A9':
        this.router.navigate(['/concepto-satisfactorio', this.tramite.id]);
        break;
    }
  }
}
