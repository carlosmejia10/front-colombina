import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Combined imports for ActivatedRoute and Router
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { UsuarioDTO } from '@/app/modelos/usuarioDTO';

@Component({
  selector: 'app-info-tramite',
  templateUrl: './info-tramite.component.html',
  styleUrls: ['./info-tramite.component.css'],
})
export class InfoTramiteComponent implements OnInit {
  mostrarBoton: boolean = true;
  solicitud?: SolicitudDTO;  // Making it optional
  solicitante?: UsuarioDTO;
  documentos?: DocumentoDTO[];
  tramiteId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private tramiteService: TramiteService,
  ) {}

  ngOnInit(): void {
    const tramiteIdParam = this.route.snapshot.paramMap.get('id');
    if (tramiteIdParam) {
      this.tramiteId = +tramiteIdParam;
      this.getTramiteDetails(this.tramiteId);
    }
  }

  getTramiteDetails(id: number): void {
    this.tramiteService.findById(id).subscribe({
      next: (data: SolicitudDTO) => {
        console.log("Datos recibidos:", data); // Log para verificar los datos recibidos
        this.solicitud = data;
      },
      error: (err) => {
        console.error("Error al obtener los detalles del trámite:", err);
      }
    });
}

  goToTramiteA8(): void {
    this.router.navigate(['/tramite-a8', this.tramiteId]);
  }

  escalarTramite(): void {
    if (this.solicitud && this.solicitud.tramite) {
      alert(
        `El trámite con número de radicado ${this.solicitud.tramite.numeroRadicado} ha sido escalado.`
      );
      this.mostrarBoton = false;
    }
  }
}
