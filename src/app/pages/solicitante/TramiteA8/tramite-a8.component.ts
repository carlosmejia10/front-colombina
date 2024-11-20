import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';

@Component({
  selector: 'app-tramite-a8',
  templateUrl: './tramite-a8.component.html',
  styleUrls: ['./tramite-a8.component.css']
})
export class TramiteA8Component implements OnInit {
  tramiteId!: number;
  isNacional: boolean = false;
  rejectionReason: string = '';
  isRejected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tramiteService: TramiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del trámite desde los parámetros de la ruta
    this.tramiteId = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar los detalles del trámite para verificar si es nacional o no
    this.loadTramiteDetails();
  }

  loadTramiteDetails(): void {
    this.tramiteService.findById(this.tramiteId).subscribe(
      (data: SolicitudDTO) => {
        console.log("Datos completos del trámite:", data);
        if (data && data.tramite) {
          console.log("Razón del rechazo obtenida:", data.tramite.rejectionReason);
          this.rejectionReason = data.tramite.rejectionReason || 'No hay razón especificada';
        } else {
          console.error("El campo 'tramite' o 'rejectionReason' no existe en los datos obtenidos.");
        }
      },
      (error) => {
        console.error("Error al obtener los detalles del trámite:", error);
      }
    );
  }
  
  

  acceptTramite(): void {
    if (this.isNacional) {
        // Si el trámite es nacional, redirige a Trámite A9
        this.router.navigate([`/aprobacion-solicitante`, this.tramiteId]);
    } else {
        // Si no es nacional, actualiza el estado del trámite a "APROBADO" en la base de datos
        this.tramiteService.updateTramiteStatus(this.tramiteId, 'APROBADO').subscribe(() => {
            alert('Trámite aprobado.');
            // Regresa a la pantalla de información del trámite con el estado actualizado
            this.router.navigate(['/info-tramite', this.tramiteId]);
        });
    }
  }

  enableRejectionReason(): void {
    this.isRejected = true;
  }

  submitRejection(): void {
    if (this.rejectionReason.trim() === '') {
      alert('Por favor, ingrese una razón de rechazo.');
      return;
    }

    // Llamada al servicio para actualizar el estado del trámite a RECHAZADO con la razón
    this.tramiteService.updateTramiteStatus(this.tramiteId, 'RECHAZADO', this.rejectionReason).subscribe({
      next: () => {
        alert('Proceso en trámite por Asuntos Regulatorios.');
        this.router.navigate(['/tabla-tramite']);
      },
      error: (err) => {
        console.error('Error al rechazar el trámite:', err);
        alert('Hubo un problema al rechazar el trámite.');
      }
    });
  }
}
