// request-tramite-solicitud.dto.ts
import { SolicitudDTO } from './solicitud.dto';
import { TramiteDTO } from './tramite.dto';

export class RequestTramiteSolicitudDTO {
  solicitudDTO: SolicitudDTO;
  tramiteDTO: TramiteDTO;

  constructor(solicitudDTO: SolicitudDTO, tramiteDTO: TramiteDTO) {
    this.solicitudDTO = solicitudDTO;
    this.tramiteDTO = tramiteDTO;
  }
}
