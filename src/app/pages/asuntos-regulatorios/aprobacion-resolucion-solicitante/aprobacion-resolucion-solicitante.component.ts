import {Component, Input} from '@angular/core';
import {TramiteDTO} from "@/app/modelos/tramite.dto";
import {NotificacionDto} from "@/app/modelos/notificacion-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-aprobacion-resolucion-solicitante',
  standalone: true,
  imports: [],
  templateUrl: './aprobacion-resolucion-solicitante.component.html',
  styleUrl: './aprobacion-resolucion-solicitante.component.css'
})
export class AprobacionResolucionSolicitanteComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();
  ultimoComentario: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.obtenerUltimoComentarioSolicitante();
  }

  obtenerUltimoComentarioSolicitante() {
    let ultimoComentarioEncontrado: string | null = null;
    let ultimaFecha = new Date(0); // Fecha inicial antigua para comparar

    this.tramite.historialCambioDTOList.forEach(cambio => {
      cambio.comentarios.forEach(comentario => {
        if (comentario.idUsuarioOrigen === this.tramite.solicitanteId && cambio.fechaCambio > ultimaFecha) {
          ultimaFecha = cambio.fechaCambio;
          ultimoComentarioEncontrado = comentario.comentario;
        }
      });
    });

    this.ultimoComentario = ultimoComentarioEncontrado || "No hay comentarios disponibles para este solicitante.";
  }

  aprobarReclamacion() {
    this.tramite.estado = "APROBADO";
    alert(`La resolución del tramite "${this.tramite.numeroRadicado}" ha sido aprobada.`);
    this.router.navigate(['/apertura-tramite', this.tramite.numeroRadicado]);

  }

  rechazarReclamacion() {
    this.tramite.estado = "RECHAZADO";
    this.notificacion.mensaje = `Rechazada la observación del trámite: ${this.tramite.numeroRadicado}`;
    this.notificacion.fecha = new Date();
    alert(this.notificacion.mensaje);
    console.log(this.notificacion.mensaje);
  }

  volver() {
    this.router.navigate(['/']);
  }

}
