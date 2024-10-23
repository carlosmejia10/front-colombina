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
      // //Cargar datos de prueba
      // this.tramites = [
      //   new Tramite(
      //     1,
      //     'AR-0001-2024',
      //     EstadoTramite.APROBADO,
      //     new Date('2024-10-15'),
      //     new Date('2024-10-25'),
      //     new EntidadSanitaria(),
      //     [new Documento()],
      //     [],
      //     [],
      //     [],
      //     new Solicitud(1, 'Galletas', 'Comida', new Date(), 'A'),
      //     'A'
      //   ),
      //   new Tramite(
      //     2,
      //     'AR-0002-2024',
      //     EstadoTramite.PENDIENTE,
      //     new Date('2024-10-15'),
      //     new Date('2024-10-18'),
      //     new EntidadSanitaria(),
      //     [new Documento()],
      //     [],
      //     [],
      //     [],
      //     new Solicitud(1, 'Galletas', 'Comida', new Date(), 'A'),
      //     'A'
      //   ),
      //   new Tramite(
      //     3,
      //     'AR-0003-2024',
      //     EstadoTramite.RECHAZADO,
      //     new Date('2024-10-15'),
      //     new Date('2024-10-26'),
      //     new EntidadSanitaria(),
      //     [new Documento()],
      //     [],
      //     [],
      //     [],
      //     new Solicitud(1, 'Galletas', 'Comida', new Date(), 'A'),
      //     'A'
      //   ),
      //   new Tramite(
      //     4,
      //     'AR-0004-2024',
      //     EstadoTramite.RECHAZADO,
      //     new Date('2024-10-15'),
      //     new Date('2024-10-21'),
      //     new EntidadSanitaria(),
      //     [new Documento()],
      //     [],
      //     [],
      //     [],
      //     new Solicitud(1, 'Galletas', 'Comida', new Date(), 'B'),
      //     'B'
      //   ),
      //   new Tramite(
      //     5,
      //     'AR-0005-2024',
      //     EstadoTramite.APROBADO,
      //     new Date('2024-10-15'),
      //     new Date('2024-10-20'),
      //     new EntidadSanitaria(),
      //     [new Documento()],
      //     [],
      //     [],
      //     [],
      //     new Solicitud(1, 'Galletas', 'Comida', new Date(), 'B'),
      //     'B'
      //   ),
      //   new Tramite(
      //     6,
      //     'AR-0006-2024',
      //     EstadoTramite.APROBADO,
      //     new Date('2024-10-15'),
      //     new Date('2024-10-23'),
      //     new EntidadSanitaria(),
      //     [new Documento()],
      //     [],
      //     [],
      //     [],
      //     new Solicitud(1, 'Galletas', 'Comida', new Date(), 'B'),
      //     'B'
      //   )
      // ];
      // // Inicializar tramitesMostrados con todos los trámites al inicio
      // this.tramitesMostrados = [...this.tramites];

      this.getTramites()
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

getProgressClass(progreso: number): string {
  if (progreso >= 75) {
      return 'progress-success';  // Color para progreso alto
  } else if (progreso >= 50) {
      return 'progress-warning';  // Color para progreso medio
  } else {
      return 'progress-danger';    // Color para bajo progreso
  }
}

}
