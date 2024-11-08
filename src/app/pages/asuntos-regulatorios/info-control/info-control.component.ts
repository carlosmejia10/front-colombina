import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';
import { EntidadSanitariaService } from '@/app/servicios/entidad-sanitaria.service';

@Component({
  selector: 'app-info-control',
  templateUrl: './info-control.component.html',
  styleUrls: ['./info-control.component.css'],
})
export class InfoControlComponent implements OnInit {
  tramite!: TramiteDTO; // Trámite seleccionado
  entidadSanitaria?: EntidadSanitaria; // Información de la entidad sanitaria

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tramiteService: TramiteService,
    private entidadSanitariaService: EntidadSanitariaService
  ) {}

  ngOnInit(): void {
    const tramiteId = this.route.snapshot.paramMap.get('id');
    if (tramiteId) {
      this.getTramiteDetails(+tramiteId);
    }
  }

  // Obtener los detalles del trámite y cargar la entidad sanitaria utilizando el ID
  getTramiteDetails(id: number): void {
    this.tramiteService.findById(id).subscribe(
      (data: TramiteDTO) => {
        this.tramite = data;
        // Llamar a la función para cargar entidad sanitaria por ID
        if (this.tramite.entidadSanitariaId) {
          this.loadEntidadSanitaria(this.tramite.entidadSanitariaId);
        }
      },
      (error) => {
        console.error('Error al cargar el trámite:', error);
      }
    );
  }

  // Método para cargar los detalles de la entidad sanitaria
  loadEntidadSanitaria(entidadSanitariaId: number): void {
    this.entidadSanitariaService.findById(entidadSanitariaId).subscribe(
      (data: EntidadSanitaria) => {
        this.entidadSanitaria = data;
      },
      (error) => {
        console.error('Error al cargar la entidad sanitaria:', error);
      }
    );
  }

  submit(): void {
    alert('Formulario enviado correctamente.');
    this.router.navigate(['/documentos']);
  }
}
