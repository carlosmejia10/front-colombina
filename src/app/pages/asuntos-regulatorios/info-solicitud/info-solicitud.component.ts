import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { UsuarioDTO } from '@/app/modelos/usuarioDTO';
import { EntidadSanitariaService } from '@/app/servicios/entidad-sanitaria.service';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-solicitud',
  templateUrl: './info-solicitud.component.html',
  styleUrl: './info-solicitud.component.css'
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
    private entidadSanitariaService: EntidadSanitariaService // Inyecta el servicio
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
      this.getEntidadSanitariaDetails(data.entidadSanitariaId); // Llama a la función para cargar la entidad
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
}
