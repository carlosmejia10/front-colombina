export class InfoControlDTO {
  constructor(
    public fechaTerminación: Date,
    public fechaNotificacion: Date,
    public idSeguimiento: number,
    public registroSanitario: string,
    public expedienteRSA: string,
    public numeroRSA: number,
    public fechaVencimientoRSA: Date,
    public planta: string,
    public numeroFactura: string,
    public observaciones: string,
  ) {}
}