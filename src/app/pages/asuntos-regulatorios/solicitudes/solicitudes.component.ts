import { Documento } from '@/app/modelos/documento';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';
import { Solicitud } from '@/app/modelos/solicitud';
import { EstadoTramite, Tramite } from '@/app/modelos/tramite';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import {SolicitudDTO} from "@/app/modelos/solicitud.dto";
import {SolicitudDEIService} from "@/app/servicios/solicitud-dei.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent {
  solicitudes: SolicitudDTO[] = [];
  filteredSolicitudes: SolicitudDTO[] = [];
  nombreSolicitante!: string;

  // Opciones y valores seleccionados para los filtros
  tipoProductoOptions: string[] = [];
  tipoTramiteOptions: string[] = [];
  estadoTramiteOptions: string[] = ['EN_REVISION', 'APROBADO', 'RECHAZADO', 'PENDIENTE'];
  selectedTipoProducto: string = '';
  selectedTipoTramite: string = '';
  selectedEstadoTramite: string = '';

  mostrarTabla1: boolean = true; // Controla la visibilidad de la tabla

  constructor(private solicitudService: SolicitudDEIService, private router: Router){}

  ngOnInit(): void {
    this.getTramites();
    this.getNombreSolicitante();
  }

  // Navegar a la página de detalles del trámite
  goToTramiteInfo(tramiteId: number): void {
    this.router.navigate(['/info-tramite', tramiteId]); // asegúrate de usar 'info-tramite' aquí
  }

  // Obtener la lista de trámites
  getTramites(): void {
    this.solicitudService.findAll().subscribe(
      (data: SolicitudDTO[]) => {
        this.solicitudes = data;
        this.filteredSolicitudes = data;
        this.setFilterOptions();
      },
      (error) => {
        console.error('Error al obtener los trámites:', error);
      }
    );
  }

  // Establece las opciones únicas para los filtros de tipo producto y tipo trámite
  setFilterOptions(): void {
    this.tipoProductoOptions = [...new Set(this.solicitudes.map(s => s.tramite.tipoProducto))];
    this.tipoTramiteOptions = [...new Set(this.solicitudes.map(s => s.tramite.tipoTramite))];
  }

  // Método para filtrar la lista de trámites en función de los filtros seleccionados
  filterTramites(): void {
    this.filteredSolicitudes = this.solicitudes.filter(solicitud => {
      const matchTipoProducto = this.selectedTipoProducto ? solicitud.tramite.tipoProducto === this.selectedTipoProducto : true;
      const matchTipoTramite = this.selectedTipoTramite ? solicitud.tramite.tipoTramite === this.selectedTipoTramite : true;
      const matchEstadoTramite = this.selectedEstadoTramite ? solicitud.tramite.estado === this.selectedEstadoTramite : true;
      return matchTipoProducto && matchTipoTramite && matchEstadoTramite;
    });
  }

  getNombreSolicitante(): void {
    this.nombreSolicitante = 'Nombre del solicitante quemado';
  }

  toggleTabla(): void {
    this.mostrarTabla1 = !this.mostrarTabla1;
  }

  getProgresoEntero(progreso: number): number {
    return Math.round(progreso * 100);
  }

  getProgressClass(progreso: number): string {
    if (progreso >= 75) {
      return 'progress-success';
    } else if (progreso >= 50) {
      return 'progress-warning';
    } else {
      return 'progress-danger';
    }
  }

  getFechaAproxFin(fechaInicio: Date): Date {
    const fecha = new Date(fechaInicio);
    fecha.setMonth(fecha.getMonth() + 1);
    return fecha;
  }

  isOnlyEstadoActive(): boolean {
    return (
      this.selectedEstadoTramite && // El estado está seleccionado
      !this.selectedTipoProducto && // No hay tipo de producto seleccionado
      !this.selectedTipoTramite // No hay tipo de trámite seleccionado
    );
  }
}
