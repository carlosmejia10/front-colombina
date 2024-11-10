import { Component, OnInit } from '@angular/core';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { SolicitudDEIService } from '@/app/servicios/solicitud-dei.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-tramite',
  templateUrl: './tabla-tramite.component.html',
  styleUrls: ['./tabla-tramite.component.css'],
})
export class TablaTramiteComponent implements OnInit {
  solicitudes: SolicitudDTO[] = [];
  filteredSolicitudes: SolicitudDTO[] = [];
  nombreSolicitante!: string;
  searchTerm: string = ''; // Término de búsqueda
  loading: boolean = true;
  page: number = 1;
  limit: number = 5;

  // Opciones y valores seleccionados para los filtros
  tipoProductoOptions: string[] = [
    'NUEVO REGISTRO',
    'MODIFICACION',
    'RENOVACION',
  ];
  tipoTramiteOptions: string[] = [
    'NACIONAL',
    'INTERNACIONAL',
  ];
  estadoTramiteOptions: string[] = ['EN_REVISION', 'APROBADO', 'RECHAZADO', 'PENDIENTE'];
  selectedTipoProducto: string = '';
  selectedTipoTramite: string = '';
  selectedEstadoTramite: string = '';

  mostrarTabla1: boolean = true;

  // Filtros de fechas
  selectedFechaInicio: string | null = null; // Almacena la fecha seleccionada como string (YYYY-MM-DD)
  selectedFechaFin: string | null = null;

  constructor(
    private solicitudService: SolicitudDEIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getNombreSolicitante();
    this.getTramites();
  }

  // Navegar a la página de detalles del trámite
  goToTramiteInfo(tramiteId: number): void {
    this.router.navigate(['/info-tramite', tramiteId]);
  }

  // Obtener la lista de trámites
  getTramites(): void {
    const filters = {
      filtro: this.searchTerm,
      tipo: this.selectedTipoProducto,
      nacionalidad: this.selectedTipoTramite,
      estado: this.selectedEstadoTramite,
      fechaInicio: this.selectedFechaInicio,
      fechaFin: this.selectedFechaFin,
    }

    if (!this.searchTerm) delete filters.filtro;
    if (!this.selectedTipoProducto) delete filters.tipo;
    if (!this.selectedTipoTramite) delete filters.nacionalidad;
    if (!this.selectedEstadoTramite) delete filters.estado;
    if (!this.selectedFechaInicio) delete filters.fechaInicio;
    if (!this.selectedFechaFin) delete filters.fechaFin;

    this.solicitudService.findBySolicitanteAndFilters(filters, this.page, this.limit).subscribe(
      (data: SolicitudDTO[]) => {
        this.solicitudes = data;
        this.filteredSolicitudes = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los trámites:', error);
      }
    );
  }

  // Filtrar la lista de trámites según filtros y término de búsqueda
  filterTramites(): void {
    this.page = 1;
    this.solicitudes = [];
    this.filteredSolicitudes = [];
    this.loading = true;
    this.getTramites();
  }

  // Obtener el nombre del solicitante
  getNombreSolicitante(): void {
    this.nombreSolicitante = 'Nombre del solicitante quemado';
  }

  toggleTabla(): void {
    this.mostrarTabla1 = !this.mostrarTabla1;
  }

  // Calcula el porcentaje de progreso entero
  getProgresoEntero(progreso: number): number {
    return Math.round(progreso * 100);
  }

  // Asigna una clase al progreso según el porcentaje
  getProgressClass(progreso: number): string {
    if (progreso >= 75) return 'progress-success';
    else if (progreso >= 50) return 'progress-warning';
    else return 'progress-danger';
  }

  // Calcula la fecha aproximada de fin
  getFechaAproxFin(fechaInicio: Date): Date {
    const fecha = new Date(fechaInicio);
    fecha.setMonth(fecha.getMonth() + 1);
    return fecha;
  }

  // Verifica si solo el estado está activo
  isOnlyEstadoActive(): boolean {
    return (
      this.selectedEstadoTramite &&
      !this.selectedTipoProducto &&
      !this.selectedTipoTramite
    );
  }

  // Exporta los trámites filtrados a un archivo Excel
  exportarAExcel(): void {
    const datosExcel = this.filteredSolicitudes.map((s) => ({
      FechaInicio: s.fechaSolicitud,
      FechaFin: s.fechaSolicitud ? this.getFechaAproxFin(new Date(s.fechaSolicitud)) : null,
      Solicitante: s.solicitante.nombre,
      'Tipo de Producto': s.tramite.tipoProducto,
      'Tipo de Trámite': s.tramite.tipoTramite,
      Estado: s.tramite.estado,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);

    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 14 },
      fill: { fgColor: { rgb: '0070C0' } },
      alignment: { horizontal: 'center' },
    };

    const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'];
    headerCells.forEach((cell) => {
      if (!ws[cell]) ws[cell] = {};
      ws[cell].s = headerStyle;
    });

    ws['!cols'] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 25 },
      { wch: 25 },
      { wch: 20 },
    ];

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tramites');
    XLSX.writeFile(wb, 'lista_de_solicitudes.xlsx');
  }

  previousPage(): void {
    if (this.page <= 1) return;
    this.page--;
    this.solicitudes = [];
    this.filteredSolicitudes = [];
    this.loading = true;
    this.getTramites();
  }

  nextPage(): void {
    this.page++;
    this.solicitudes = [];
    this.filteredSolicitudes = [];
    this.loading = true;
    this.getTramites();
  }

  limitChange(event: Event): void {
    this.limit = event.target ? +(event.target as HTMLSelectElement).value : 5;
    this.page = 1;
    this.solicitudes = [];
    this.filteredSolicitudes = [];
    this.loading = true;
    this.getTramites();
  }
}
