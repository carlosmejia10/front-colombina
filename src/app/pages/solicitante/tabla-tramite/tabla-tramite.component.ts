import { Component } from '@angular/core';
import { Tramite, EstadoTramite } from '../../../modelos/tramite';
import { EntidadSanitaria } from '../../../modelos/entidad-sanitaria';
import { Documento } from '../../../modelos/documento';
import { Solicitud } from '../../../modelos/solicitud';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { TramiteDTO } from '@/app/modelos/tramite.dto';

@Component({
  selector: 'app-tabla-tramite',
  templateUrl: './tabla-tramite.component.html',
  styleUrl: './tabla-tramite.component.css'
})
export class TablaTramiteComponent {

  constructor(private tramiteService: TramiteService) {}

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
      this.getTramites()
  }

  getTramites(): void {
    this.tramiteService.findAll().subscribe(
      (data: TramiteDTO[]) => { 
        this.tramites = data;
        this.tramitesMostrados = [...this.tramites]; 
        console.log('Trámites recibidos:', this.tramitesMostrados);
      },
      (error) => {
        console.error('Error al obtener los trámites:', error);
      }
    );
  }
  
  getProgresoEntero(progreso:number): number {
    return Math.round(progreso * 100);
  }

  getProgressClass(progreso: number): string {
    if (progreso >= 75) {
      return 'progress-success';  // Color para progreso alto
    } else if (progreso >=50) {
      return 'progress-warning';  // Color para progreso medio
    } else {
      return 'progress-danger';    // Color para bajo progreso
    }
  }
}
