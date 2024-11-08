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

  // Opciones y valores seleccionados para los filtros
  tipoProductoOptions: string[] = [];
  tipoTramiteOptions: string[] = [];
  estadoTramiteOptions: string[] = [
    'EN_REVISION',
    'APROBADO',
    'RECHAZADO',
    'PENDIENTE',
  ];
  selectedTipoProducto: string = '';
  selectedTipoTramite: string = '';
  selectedEstadoTramite: string = '';

  mostrarTabla1: boolean = true;

  constructor(
    private solicitudService: SolicitudDEIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTramites();
    this.getNombreSolicitante();
  }

  // Navegar a la página de detalles del trámite
  goToTramiteInfo(tramiteId: number): void {
    this.router.navigate(['/info-tramite', tramiteId]);
  }

  // Obtener la lista de trámites
  getTramites(): void {
    this.solicitudService.findBySolicitante().subscribe(
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
    this.tipoProductoOptions = [
      ...new Set(this.solicitudes.map((s) => s.tramite.tipoProducto)),
    ];
    this.tipoTramiteOptions = [
      ...new Set(this.solicitudes.map((s) => s.tramite.tipoTramite)),
    ];
    this.tipoProductoOptions;
  }

  // Filtrar la lista de trámites según filtros y término de búsqueda
  filterTramites(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredSolicitudes = this.solicitudes.filter((solicitud) => {
      const tramite = solicitud.tramite;
      const matchSearchTerm = tramite
        ? tramite.nombreProducto.toLowerCase().includes(term) ||
          tramite.tipoProducto.toLowerCase().includes(term) ||
          tramite.numeroRadicado?.toLowerCase().includes(term)
        : false;

      const matchTipoProducto = this.selectedTipoProducto
        ? tramite?.tipoProducto === this.selectedTipoProducto
        : true;
      const matchTipoTramite = this.selectedTipoTramite
        ? tramite?.tipoTramite === this.selectedTipoTramite
        : true;
      const matchEstadoTramite = this.selectedEstadoTramite
        ? tramite?.estado === this.selectedEstadoTramite
        : true;

      return (
        matchSearchTerm &&
        matchTipoProducto &&
        matchTipoTramite &&
        matchEstadoTramite
      );
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
    if (progreso >= 75) return 'progress-success';
    else if (progreso >= 50) return 'progress-warning';
    else return 'progress-danger';
  }

  getFechaAproxFin(fechaInicio: Date): Date {
    const fecha = new Date(fechaInicio);
    fecha.setMonth(fecha.getMonth() + 1);
    return fecha;
  }

  isOnlyEstadoActive(): boolean {
    return (
      this.selectedEstadoTramite &&
      !this.selectedTipoProducto &&
      !this.selectedTipoTramite
    );
  }

  exportarAExcel(): void {
    const datosExcel = this.filteredSolicitudes.map((s) => ({
      Fecha: s.fechaSolicitud,
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

    const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1'];
    headerCells.forEach((cell) => {
      if (!ws[cell]) ws[cell] = {};
      ws[cell].s = headerStyle;
    });

    ws['!cols'] = [
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
}
