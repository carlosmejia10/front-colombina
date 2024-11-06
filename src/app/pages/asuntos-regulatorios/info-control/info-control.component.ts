import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadSanitaria } from '../../../modelos/entidad-sanitaria';
import { EntidadSanitariaService } from '@/app/servicios/entidad-sanitaria.service';

@Component({
  selector: 'app-info-control',
  templateUrl: './info-control.component.html',
  styleUrls: ['./info-control.component.css'],
})
export class InfoControlComponent {
  tramite: TramiteDTO;
  entidadSanitaria: EntidadSanitaria;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tramiteService: TramiteService,
    private entidadSanitariaService: EntidadSanitariaService
  ) {}

  ngOnInit(): void {
    const tramiteId = this.route.snapshot.paramMap.get('numeroRadicado');
    if (tramiteId) {
      this.getTramiteDetails(+tramiteId);
    }
  }

  getTramiteDetails(id: number): void {
    this.tramiteService.findById(id).subscribe((data: TramiteDTO) => {
      this.tramite = data;
      this.entidadSanitariaService
        .findById(this.tramite.entidadSanitariaId)
        .subscribe((data: EntidadSanitaria) => {
          this.entidadSanitaria = data;
        });
    });
  }

  submit() {
    // Aquí podrías manejar la lógica del formulario
    alert('Formulario enviado correctamente.');
    this.router.navigate(['/documentos']);
  }
}
