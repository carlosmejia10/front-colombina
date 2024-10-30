import { ComentarioDTO } from "./comentario.dto";

export class HistorialCambioDTO{
  id: number | null;
  descripcion: string;
  fechaCambio: Date;
  tramiteId: number;
  comentarios: ComentarioDTO[];
    constructor(
        id: number | null,
        descripcion: string,
        fechaCambio: Date,
        tramiteId: number ,
        comentarios: ComentarioDTO[] = []
    ){}
}
