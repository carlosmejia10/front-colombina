import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';

@Component({
  selector: 'app-revisar-rechazo',
  templateUrl: './revisar-rechazo.component.html',
  styleUrls: ['./revisar-rechazo.component.css']
})
export class RevisarRechazoComponent implements OnInit {
  tramiteId!: number;
  rejectionReason: string = '';

  constructor(
    private route: ActivatedRoute,
    private tramiteService: TramiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tramiteId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTramiteDetails();
  }

  loadTramiteDetails(): void {
    this.tramiteService.findById(this.tramiteId).subscribe((data: SolicitudDTO) => {
      if (data && data.tramite) {
        // Asegurarse de que el campo rejectionReason exista y esté asignado correctamente
        this.rejectionReason = data.tramite.rejectionReason || 'No hay razón especificada';
      } else {
        console.error("El objeto 'tramite' o 'rejectionReason' no fue encontrado en los datos obtenidos.");
      }
    }, error => {
      console.error("Error al obtener los detalles del trámite:", error);
    });
  }

  acceptTramite(): void {
    const etapa = 'A2'; // O la etapa que corresponda al trámite
    this.router.navigate([`/formulario-general`, this.tramiteId, etapa]);
  }
  

  rejectTramite(): void {
    this.tramiteService.updateTramiteStatus(this.tramiteId, 'RECHAZADO').subscribe(() => {
      alert('Trámite rechazado definitivamente.');
      this.router.navigate(['/solicitudes']);
    });
  }
}
