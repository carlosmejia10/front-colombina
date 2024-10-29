import { TramiteDTO } from "./tramite.dto";

export class SolicitudDTO {
  id: number;
  fechaSolicitud: Date; // Cambiar 'fecha' a 'fechaSolicitud' para que coincida con el backend
  tramite?: TramiteDTO;

  constructor(id: number, fechaSolicitud: Date, tramite?: TramiteDTO) {
    this.id = id;
    this.fechaSolicitud = fechaSolicitud;
    this.tramite = tramite;
  }
}
