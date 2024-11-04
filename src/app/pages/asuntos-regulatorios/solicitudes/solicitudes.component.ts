import { Documento } from '@/app/modelos/documento';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';
import { Solicitud } from '@/app/modelos/solicitud';
import { EstadoTramite, Tramite } from '@/app/modelos/tramite';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { TramiteRegulatorioService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import {SolicitudDTO} from "@/app/modelos/solicitud.dto";
import {SolicitudDEIService} from "@/app/servicios/solicitud-dei.service";
import {Router} from "@angular/router";
import * as XLSX from 'xlsx';


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
    this.router.navigate(['/info-solicitud', tramiteId]); // asegúrate de usar 'info-tramite' aquí
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

  exportarAExcel(): void {

    const datosExcel = this.filteredSolicitudes.map(s => ({
      Fecha : s.fechaSolicitud,
      Solicitante: s.solicitante.nombre,
      'Tipo de Producto' : s.tramite.tipoProducto,
      'Tipo de Trámite' : s.tramite.tipoTramite,
      Estado: s.tramite.estado,
    }));


    // Convertir la lista de drogas a una hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExcel);

// Estilo para el encabezado
const headerStyle = {
  font: {
      bold: true,
      color: { rgb: 'FFFFFF' }, // Texto blanco
      sz: 14, // Tamaño de fuente
  },
  fill: {
      fgColor: { rgb: '0070C0' }, // Color de fondo azul
  },
  alignment: {
      horizontal: 'center',
  }
};

// Aplicar estilo al encabezado
const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1']; // Celdas del encabezado
headerCells.forEach(cell => {
  if (!ws[cell]) {
      ws[cell] = {};
  }
  ws[cell].s = headerStyle; // Aplicar el estilo
});

// Ajustar el ancho de las columnas
ws['!cols'] = [
  { wch: 20 }, // Ancho para 'Fecha'
  { wch: 30 }, // Ancho para 'Solicitante'
  { wch: 25 }, // Ancho para 'Tipo de Producto'
  { wch: 25 }, // Ancho para 'Tipo de Trámite'
  { wch: 20 }, // Ancho para 'Estado'
];
    
    // Crear un libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
    // Añadir la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Tramites');
    
    // Generar el archivo Excel
    const excelFileName = 'lista_de_solicitudes.xlsx';
    XLSX.writeFile(wb, excelFileName);
  }
}
