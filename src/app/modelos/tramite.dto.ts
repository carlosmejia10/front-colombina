import { HistorialCambioDTO } from './historialcambio.dto';
import { Solicitud } from './solicitud';
import { EntidadSanitaria } from './entidad-sanitaria';

export class TramiteDTO {
  id?: number;
  numeroRadicado?: string;
  nombreProducto: string;
  descripcionProducto: string;
  tipoProducto: string;
  tipoTramite: string;
  estado: string;
  fechaRadicacion: Date;
  progreso: number;
  llave: number;
  solicitanteId: number;
  entidadSanitariaId: number;
  etapa: string;
  historialCambioDTOList: HistorialCambioDTO[];
  pt?: string;
  unidadNegocio?: string;
  numProyectoSap?: number;
  proyecto?: string;
  tipoModificacion?: string;
  descripcionTramite?: string;
  claseTramite?: string;
  fechaSolicitud?: Date;
  solicitud?: Solicitud;
  rejectionReason?: string;  // Agregar `rejectionReason` como propiedad opcional
  entidadSanitaria?: EntidadSanitaria;
  fechaTerminacion?: Date; // Nuevo campo
  fechaNotificacion?: Date; // Nuevo campo
  registroSanitario?: string; // Nuevo campo
  expedienteRSA?: string; // Nuevo campo
  numeroRSA?: number; // Nuevo campo
  expNum?: number; // Nuevo campo
  fechaVencimientoRSA?: Date; // Nuevo campo
  planta?: string; // Nuevo campo
  numeroFactura?: string; // Nuevo campo
  observaciones?: string; // Nuevo campo
  llaveRSAColombia?: string; // Nuevo campo
  urgente?: boolean; // Nuevo campo
  fechaLlegadaResol?: Date; // Nuevo campo
  okSatisfactorioInvima?: boolean; // Nuevo campo
  fechaEnvioDocumentos?: Date; // Nuevo campo

  constructor(
    nombreProducto: string,
    descripcionProducto: string,
    tipoProducto: string,
    tipoTramite: string,
    estado: string,
    fechaRadicacion: Date,
    progreso: number,
    llave: number,
    entidadSanitariaId: number,
    historialCambioDTOList: HistorialCambioDTO[],
    rejectionReason?: string  // Asegurar que el constructor pueda aceptar `rejectionReason`
  ) {
    this.nombreProducto = nombreProducto;
    this.descripcionProducto = descripcionProducto;
    this.tipoProducto = tipoProducto;
    this.tipoTramite = tipoTramite;
    this.estado = estado;
    this.fechaRadicacion = fechaRadicacion;
    this.progreso = progreso;
    this.llave = llave;
    this.entidadSanitariaId = entidadSanitariaId;
    this.historialCambioDTOList = historialCambioDTOList;
    this.rejectionReason = rejectionReason;  // Asignar `rejectionReason` si está presente
  }
}
