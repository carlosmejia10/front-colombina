import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apertura-tramite',
  templateUrl: './apertura-tramite.component.html',
  styleUrl: './apertura-tramite.component.css',
})
export class AperturaTramiteComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tramiteService: TramiteService
  ) {}

  private numeroRadicado: string;
  tramite: TramiteDTO;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.numeroRadicado = params['numeroRadicado'];
      this.tramiteService
        .findById(parseInt(this.numeroRadicado))
        .subscribe((tramite) => {
          this.tramite = tramite;
        });
    });
  }

  submit() {
    console.log(this.tramite)
    if (
      !this.tramite.pt ||
      !this.tramite.unidadNegocio ||
      !this.tramite.numProyectoSap ||
      !this.tramite.proyecto ||
      !this.tramite.tipoModificacion ||
      !this.tramite.descripcionTramite ||
      !this.tramite.claseTramite
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    this.router.navigate(['/documentos', this.numeroRadicado]);
  }
}
