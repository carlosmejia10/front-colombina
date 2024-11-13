export class InfoAperturaTramite {
  constructor(
    public pt: string,
    public unidadNegocio: string,
    public numProyectoSap: number,
    public proyecto: string,
    public tipoModificacion: string,
    public registroRSA: string,
    public expedienteRSA: string,
    public urgente: boolean,
    public numRSA: number,
    public vencimientoRSA: Date,
    public planta: string,
    public observaciones: string,
  ) {}
}
