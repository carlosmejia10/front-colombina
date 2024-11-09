import { Component, Input } from '@angular/core';
import { TramiteDTO } from "@/app/modelos/tramite.dto";
import { NotificacionDto } from "@/app/modelos/notificacion-dto";
import { Router, ActivatedRoute } from "@angular/router";
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';

@Component({
  selector: 'app-seguimiento-tramite',
  templateUrl: './seguimiento-tramite.component.html',
  styleUrls: ['./seguimiento-tramite.component.css'] 
})
export class SeguimientoTramiteComponent {
  @Input() tramite!: TramiteDTO;
  notificacion: NotificacionDto = new NotificacionDto();
  aprobadoSeleccionado = false;
  rechazadoSeleccionado = false;
  numeroRadicado: string = '';
  llave: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tramiteService: TramiteService
  ) {}

  ngOnInit(): void {
    const tramiteId = this.route.snapshot.paramMap.get('id');
    if (tramiteId) {
      this.getTramiteDetails(+tramiteId);
    }
  }

  getTramiteDetails(id: number): void {
    this.tramiteService.findById(id).subscribe((data: TramiteDTO) => {
      this.tramite = data;
    });
  }

  tramiteAprobado() {
    const confirmation = window.confirm(`¿Seguro quiere continuar con la aprobación del trámite: ${this.tramite.id}?`);
  if (confirmation) {
    // El usuario ha presionado "Aceptar"
    this.tramite.estado = "APROBADO";
    alert(`El trámite ${this.tramite.id} ha sido aprobado.`);
    this.aprobadoSeleccionado = true;
    this.rechazadoSeleccionado = false;
    this.tramite.estado = "APROBADO";
    //this.router.navigate(['/asignacion-radicado-llave', this.tramite.numeroRadicado]);
  } else {
    // El usuario ha presionado "Cancelar"
    alert('Aprobación del trámite cancelada.');
  }
  }

  tramiteRechazado() {
    const confirmation = window.confirm(`¿Seguro quiere continuar con el rechazo del trámite: ${this.tramite.id}?`);
    if(confirmation){
      this.tramite.estado="RECHAZADO";
      alert(`El trámite ${this.tramite.id} ha sido rechazado.`)
      this.aprobadoSeleccionado = false;
    this.rechazadoSeleccionado = true;
    this.tramite.estado = "RECHAZADO";
    //this.router.navigate(['/revision-preliminar', this.tramite.numeroRadicado]);
    } 
    else{
      alert('Rechazo del trámite cancelada.');
    }    
  }

  guardarInfo() {
    // Verificar que tanto númeroRadicado como llave no estén vacíos
    if (!this.numeroRadicado || !this.llave) {
      alert('Por favor, complete todos los campos antes de enviar.');
      return;
    }
  
    // Actualizar los atributos numeroRadicado y llave del tramite cargado
    this.tramite.numeroRadicado = this.numeroRadicado;
    this.tramite.llave = this.llave;
  
    // Llamada al servicio para actualizar el tramite
    this.tramiteService.updateTramite(this.tramite.id, this.numeroRadicado,this.llave).subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
        alert(`Información actualizada: Número Radicado - ${this.numeroRadicado}, Llave - ${this.llave}`);
      },
      (error) => {
        // Manejo de errores en caso de que la actualización falle
        console.error('Error al actualizar el trámite', error);
        alert('Error al actualizar el trámite. Por favor, inténtalo de nuevo.');
      }
    );
  }

  pedirNuevoDocumento() {
    // Lógica para pedir un nuevo documento
  }

  corregirFormulario() {
    // Lógica para corregir el formulario
  }
}
