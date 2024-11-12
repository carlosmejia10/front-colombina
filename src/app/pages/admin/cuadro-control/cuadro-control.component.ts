import { Component, OnInit } from '@angular/core';
import { SolicitudDEIService } from '@/app/servicios/solicitud-dei.service';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuadro-control',
  templateUrl: './cuadro-control.component.html',
  styleUrls: ['./cuadro-control.component.css'],
})
export class CuadroControlComponent implements OnInit {
  solicitudes: SolicitudDTO[] = [];
  page: number = 1;
  limit: number = 20;
  loading: boolean = true;
  searchTerm: string = '';

  constructor(
    private solicitudService: SolicitudDEIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.solicitudService
      .findAllByFilters({ filtro: this.searchTerm }, this.page, this.limit)
      .subscribe(
        (data: SolicitudDTO[]) => {
          this.solicitudes = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error al cargar las solicitudes:', error);
        }
      );
  }

  navigateToInfoControl(id: number): void {
    this.router.navigate(['/info-control', id]);
  }

  filterTramites(): void {
    this.page = 1;
    this.solicitudes = [];
    this.loading = true;
    this.cargarSolicitudes();
  }

  previousPage(): void {
    if (this.page <= 1) return;
    this.page--;
    this.solicitudes = [];
    this.loading = true;
    this.cargarSolicitudes();
  }

  nextPage(): void {
    this.page++;
    this.solicitudes = [];
    this.loading = true;
    this.cargarSolicitudes();
  }

  limitChange(event: Event): void {
    this.limit = event.target ? +(event.target as HTMLSelectElement).value : 20;
    this.page = 1;
    this.solicitudes = [];
    this.loading = true;
    this.cargarSolicitudes();
  }
}
