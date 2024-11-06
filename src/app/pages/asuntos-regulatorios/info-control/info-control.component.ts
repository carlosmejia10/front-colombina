import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-control',
  templateUrl: './info-control.component.html',
  styleUrls: ['./info-control.component.css'],
})
export class InfoControlComponent {
  tramite: TramiteDTO;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tramiteService: TramiteService
  ) {}


  ngOnInit(): void {
    const tramiteId = this.route.snapshot.paramMap.get('numeroRadicado');
    if (tramiteId) {
      this.getTramiteDetails(+tramiteId);
    }
  }

  getTramiteDetails(id: number): void {
    this.tramiteService.findById(id).subscribe((data: TramiteDTO) => {
      console.log('Tramite:', data);
      this.tramite = data;
      console.log(data);
    });
  }

  submit() {
    // Aquí podrías manejar la lógica del formulario
    alert('Formulario enviado correctamente.');
    this.router.navigate(['/documentos']);
  }
}
