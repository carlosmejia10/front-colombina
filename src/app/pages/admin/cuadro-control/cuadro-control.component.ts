import { Component, OnInit } from '@angular/core';
import { SolicitudDEIService } from '@/app/servicios/solicitud-dei.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuadro-control',
  templateUrl: './cuadro-control.component.html',
  styleUrls: ['./cuadro-control.component.css']
})
export class CuadroControlComponent implements OnInit {
  solicitudes: SolicitudDTO[] = []; // Array de solicitudes que contienen los trámites

  constructor(private solicitudService: SolicitudDEIService, private router: Router) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  // Método para obtener todas las solicitudes que contienen los trámites
  cargarSolicitudes(): void {
    this.solicitudService.findAll().subscribe(
      (data: SolicitudDTO[]) => {
        this.solicitudes = data;
      },
      (error) => {
        console.error('Error al cargar las solicitudes:', error);
      }
    );
  }

  // Método para navegar a la información del trámite seleccionado
  navigateToInfoControl(id: number): void {
    this.router.navigate(['/info-control', id]);
  }
}
