import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {AppModule} from "@/app/app.module";
import {SolicitudDTO} from "@/app/modelos/solicitud.dto";
import {SolicitudDEIService} from "@/app/servicios/solicitud-dei.service";
import {Router} from "@angular/router";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-cuadro-control-asuntos',
  templateUrl: './cuadro-control-asuntos.component.html',
  styleUrl: './cuadro-control-asuntos.component.css'
})
export class CuadroControlAsuntosComponent {
  solicitudes: SolicitudDTO[] = [];
  page: number = 1;
  limit: number = 20;
  loading: boolean = true;
  searchTerm: string = '';
  fileName: string = 'Tramites-Solicitudes';

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

  getFechaAproxFin(fechaInicio: Date): Date {
    const fecha = new Date(fechaInicio);
    fecha.setMonth(fecha.getMonth() + 1);
    return fecha;
  }


  exportarAExcel(): void {

    const data = this.solicitudes.map(s => ({
      'Nombre del producto': s.tramite.nombreProducto,
      'PT': s.tramite.pt,
      'Negocio': null,
      'Categoria Alimento': s.tramite.tipoProducto,
      'Planta': null,
      'Marcas Comerciales' : null,
      'Nombre Proyecto': s.tramite.proyecto,
      'Tipo de Trámite' : s.tramite.tipoTramite,
      'Descripcion Tramite' : s.tramite.descripcionTramite,
      'Fecha Solicitud llegada forma' : s.fechaSolicitud,
      'Fecha Envio forma' : s.tramite.fechaRadicacion,
      'Fecha Aprox Fin': this.getFechaAproxFin(s.tramite.fechaRadicacion),
      'Fecha notificacion' : null,
      'Pais': null,
      'Ciudad': null,
      'Registro Sanitario': s.tramite.entidadSanitariaId,
      'Expediente RSA ': null,
      '# Intencion ': s.tramite.numeroRadicado,
      'Radicado': null,
      Estado: s.tramite.estado,
      'Urgente': null,
      'Fecha de llegada resol': null,
      'ok Satisfactorio invima': null,
      'RSA/NSA PAIS': null,
      'Vencimiento RSA': null,
      'Solicitado por': s.solicitante.nombre,
      'Observaciones': null,
      'Pagado / Factura No.': null,
      'Tiempo Radicacionm' : s.tramite.fechaRadicacion,
    }));


    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Convertir el objeto de datos en una hoja de trabajo
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Estilo para encabezados con fondo gris oscuro y texto blanco
    const headerCells = ["A1", "B1", "C1", "D1", "E1"];
    headerCells.forEach(cell => {
      worksheet[cell].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F81BD" } }, // Fondo azul oscuro
        alignment: { horizontal: "center", vertical: "center" }
      };
    });

    // Ajuste de anchos de columna basado en el contenido esperado
    worksheet["!cols"] = [
      { wch: 30 }, // Nombre del producto
      { wch: 10 }, // PT
      { wch: 15 }, // Negocio
      { wch: 20 }, // Categoria Alimento
      { wch: 15 }, // Planta
      { wch: 20 }, // Marcas Comerciales
      { wch: 25 }, // Nombre Proyecto
      { wch: 20 }, // Tipo de Trámite
      { wch: 30 }, // Descripcion Tramite
      { wch: 27 }, // Fecha Solicitud llegada forma
      { wch: 20 }, // Fecha Envio forma
      { wch: 20 }, // Fecha Aprox Fin
      { wch: 20 }, // Fecha notificacion
      { wch: 15 }, // Pais
      { wch: 15 }, // Ciudad
      { wch: 20 }, // Registro Sanitario
      { wch: 20 }, // Expediente RSA
      { wch: 15 }, // # Intencion
      { wch: 15 }, // Radicado
      { wch: 15 }, // Estado
      { wch: 10 }, // Urgente
      { wch: 25 }, // Fecha de llegada resol
      { wch: 25 }, // ok Satisfactorio invima
      { wch: 20 }, // RSA/NSA PAIS
      { wch: 20 }, // Vencimiento RSA
      { wch: 20 }, // Solicitado por
      { wch: 30 }, // Observaciones
      { wch: 20 }, // Pagado / Factura No.
      { wch: 20 }  // Tiempo Radicacionm
    ];

    // Aplicar bordes y estilo a cada celda de datos
    const range = XLSX.utils.decode_range(worksheet["!ref"]!);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) { // Empieza desde la fila 2 para omitir el encabezado
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cell_address]) continue;
        worksheet[cell_address].s = {
          ...worksheet[cell_address].s,
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } }
          },
          alignment: { horizontal: "center", vertical: "center" }
        };
      }
    }

    // Añadir la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Solicitudes');

    // Generar el archivo y guardarlo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, this.fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, `${fileName}.xlsx`);
  }

}
