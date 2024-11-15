import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tramite-finalizado',
  templateUrl: './tramite-finalizado.component.html',
  styleUrls: ['./tramite-finalizado.component.css'],
})

export class TramiteFinalizadoComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tramiteService: TramiteService
  ) {}

  regresarTramites() {
    this.router.navigate(['/solicitudes']);
  }

}
