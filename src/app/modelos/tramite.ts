// tramite.model.ts
import { Documento } from './documento';
import { Pago } from './pago';
import { Seguimiento } from './seguimiento';
import { HistorialCambio } from './historial-cambio';
import { Solicitud } from './solicitud';
import { EntidadSanitaria } from './entidad-sanitaria';

export class Tramite {
  id: number;
  numeroRadicado: string;
  estado: EstadoTramite;
  fechaRadicacion: Date;
  fechaRespuesta: Date;
  entidadSanitaria?: EntidadSanitaria;
  documentos?: Documento[];
  pagos: Pago[];
  seguimientos: Seguimiento[];
  historialCambios: HistorialCambio[];
  solicitud: Solicitud;
  tipoTramite: string;

  constructor(
    id: number,
    numeroRadicado: string,
    estado: EstadoTramite,
    fechaRadicacion: Date,
    fechaRespuesta: Date,
    entidadSanitaria: EntidadSanitaria,
    documentos: Documento[],
    pagos: Pago[],
    seguimientos: Seguimiento[],
    historialCambios: HistorialCambio[],
    solicitud: Solicitud,
    tipoTramite: string
  ) {
    this.id = id;
    this.numeroRadicado = numeroRadicado;
    this.estado = estado;
    this.fechaRadicacion = this.normalizeDate(fechaRadicacion);
    this.fechaRespuesta = this.normalizeDate(fechaRespuesta);
    this.entidadSanitaria = entidadSanitaria;
    this.documentos = documentos;
    this.pagos = pagos;
    this.seguimientos = seguimientos;
    this.historialCambios = historialCambios;
    this.solicitud = solicitud;
    this.tipoTramite = tipoTramite;
  }

  // Normalizar la fecha para evitar el problema de zona horaria
  private normalizeDate(date: Date): Date {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0); // Establecer la hora en medianoche
    return normalizedDate;
  }
}

// Enum para el estado del trámite
export enum EstadoTramite {
  EN_REVISION = 'EN_REVISION',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  PENDIENTE = 'PENDIENTE',
}
