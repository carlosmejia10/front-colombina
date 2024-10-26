import { ComentarioDTO } from "./comentario.dto";

export class HistorialCambioDTO{
    constructor(
        id: number | null,
        descripcion: string,
        fechaCambio: Date,
        tramiteId: number , 
        comentarios: ComentarioDTO[] = []
    ){}
}