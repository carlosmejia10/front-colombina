import { TramiteDTO } from "./tramite.dto";

export class SolicitudDTO {
  id: number;
  fecha: Date;
  tramite?: TramiteDTO;
}
