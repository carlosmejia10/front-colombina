import { TramiteDTO } from "./tramite.dto";
import { UsuarioDTO } from "./usuarioDTO";

export class SolicitudDTO {
  id: number;
  fechaSolicitud: Date;  // Cambiar 'fecha' a 'fechaSolicitud' para que coincida con el backend
  tramite?: TramiteDTO;
  solicitante?: UsuarioDTO;

  constructor(id: number, fechaSolicitud: Date, tramite?: TramiteDTO, solicitante?: UsuarioDTO) {
    this.id = id;
    this.fechaSolicitud = fechaSolicitud;
    this.tramite = tramite;
    this.solicitante = solicitante;
  }
}
