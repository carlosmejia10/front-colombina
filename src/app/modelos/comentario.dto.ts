export class ComentarioDTO{
  id: number;
  idUsuarioDestino: number;
  idUsuarioOrigen: number;
  comentario: string;

  constructor(
        id: number,
        idUsuarioDestino: number,
        idUsuarioOrigen: number,
        comentario: string
    ){}
}
