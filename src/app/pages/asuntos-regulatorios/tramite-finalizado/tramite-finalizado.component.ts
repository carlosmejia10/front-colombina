import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tramite-finalizado',
  templateUrl: './tramite-finalizado.component.html',
  styleUrl: './tramite-finalizado.component.css'
})
export class TramiteFinalizadoComponent {
  constructor(private router:Router){}
  regresarTramites() {
    this.router.navigate(['/solicitudes']);
  }
}
