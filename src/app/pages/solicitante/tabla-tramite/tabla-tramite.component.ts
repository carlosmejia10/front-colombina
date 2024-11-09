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
  tipoProductoOptions: string[] = [];
  tipoTramiteOptions: string[] = [];
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
    this.solicitudService.findBySolicitante(this.page, this.limit).subscribe(
      (data: SolicitudDTO[]) => {
        this.solicitudes = data;
        this.filteredSolicitudes = data;
        this.setFilterOptions();
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los trámites:', error);
      }
    );
  }

  // Establece las opciones únicas para los filtros de tipo producto y tipo trámite
  setFilterOptions(): void {
    this.tipoProductoOptions = [...new Set(this.solicitudes.map((s) => s.tramite.tipoProducto))];
    this.tipoTramiteOptions = [...new Set(this.solicitudes.map((s) => s.tramite.tipoTramite))];
  }

  // Filtrar la lista de trámites según filtros y término de búsqueda
  filterTramites(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredSolicitudes = this.solicitudes.filter((solicitud) => {
      const tramite = solicitud.tramite;
      if (!tramite) return false;

      // Filtrar por término de búsqueda
      const matchSearchTerm = tramite.numeroRadicado?.toLowerCase().includes(term) ||
        tramite.nombreProducto?.toLowerCase().includes(term);

      // Filtrar por tipo de producto
      const matchTipoProducto = this.selectedTipoProducto
        ? tramite.tipoProducto === this.selectedTipoProducto
        : true;

      // Filtrar por tipo de trámite
      const matchTipoTramite = this.selectedTipoTramite
        ? tramite.tipoTramite === this.selectedTipoTramite
        : true;

      // Filtrar por estado del trámite
      const matchEstadoTramite = this.selectedEstadoTramite
        ? tramite.estado === this.selectedEstadoTramite
        : true;

      // Filtrar por rango de fechas
      const fechaInicio = this.selectedFechaInicio ? new Date(this.selectedFechaInicio) : null;
      const fechaFin = this.selectedFechaFin ? new Date(this.selectedFechaFin) : null;

      const fechaSolicitud = tramite.fechaSolicitud ? new Date(tramite.fechaSolicitud) : null;
      const fechaAproxFin = fechaSolicitud ? this.getFechaAproxFin(fechaSolicitud) : null;

      // Ajustar lógica para comparar las fechas
      const matchFechaInicio = !fechaInicio || (fechaSolicitud && fechaSolicitud >= fechaInicio);
      const matchFechaFin = !fechaFin || (fechaAproxFin && fechaAproxFin <= fechaFin);

      const matchFecha = matchFechaInicio && matchFechaFin;

      // Combinar todos los filtros
      return matchSearchTerm && matchTipoProducto && matchTipoTramite && matchEstadoTramite && matchFecha;
    });
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
