import { Documento } from '@/app/modelos/documento';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';
import { Solicitud } from '@/app/modelos/solicitud';
import { EstadoTramite, Tramite } from '@/app/modelos/tramite';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent {
  constructor(private router: Router,private tramiteService: TramiteService) {}

  tramites!: TramiteDTO[];
  searchTerm: string = '';
  mostrarTabla1: boolean = true;
  mostrarTabla2: boolean = true;
  tramitesMostrados: TramiteDTO[] = [];

  toggleTabla() {
    this.mostrarTabla1 = !this.mostrarTabla1;
    console.log('Tabla 1:', this.mostrarTabla1);
  }

  toggleTabla2() {
    this.mostrarTabla2 = !this.mostrarTabla2;
    console.log('Tabla 2:', this.mostrarTabla2);
  }

  ngOnInit(): void {
    this.getTramites();
  }

  getTramites(): void {
    this.tramiteService.findAll().subscribe(
      (data: TramiteDTO[]) => {
        this.tramites = data;
        this.tramitesMostrados = [...this.tramites];
        console.log(this.tramitesMostrados);
      },
      (error) => {
        console.error('Error al obtener los trámites:', error);
      }
    );
  }

getProgresoEntero(progreso: number): number {
    return Math.round(progreso * 100);
  }

  getProgressClass(progreso: number): string {
    if (progreso >= 75) {
      return 'progress-success'; // Color para progreso alto
    } else if (progreso >= 50) {
      return 'progress-warning'; // Color para progreso medio
    } else {
      return 'progress-danger'; // Color para bajo progreso
    }
  }

  navegarADocumentos(id:number):void{
    this.router.navigate([`/documentos/${id}`])
  }
}
