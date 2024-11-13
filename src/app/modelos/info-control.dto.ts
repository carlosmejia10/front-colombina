export class InfoControlDTO {
  constructor(
    public fechaEnvioDocumentos: Date,
    public idSeguimiento: string,
    public observaciones: string,
  ) {}
}