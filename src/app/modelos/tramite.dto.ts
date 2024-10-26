import { HistorialCambioDTO } from "./historialcambio.dto";

export class TramiteDTO {
    id: number;
    numeroRadicado: string;
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
    historialCambioDTOList: HistorialCambioDTO[];

    constructor(
        id: number,
        numeroRadicado: string,
        nombreProducto: string,
        descripcionProducto: string,
        tipoProducto: string,
        tipoTramite: string,
        estado: string,
        fechaRadicacion: Date,
        progreso: number,
        llave: number,
        solicitanteId: number,
        entidadSanitariaId: number,
        historialCambioDTOList: HistorialCambioDTO[]
    ) {
        this.id = id;
        this.numeroRadicado = numeroRadicado;
        this.nombreProducto = nombreProducto;
        this.descripcionProducto = descripcionProducto;
        this.tipoProducto = tipoProducto;
        this.tipoTramite = tipoTramite;
        this.estado = estado;
        this.fechaRadicacion = fechaRadicacion;
        this.progreso = progreso;
        this.llave = llave;
        this.solicitanteId = solicitanteId;
        this.entidadSanitariaId = entidadSanitariaId;
        this.historialCambioDTOList = historialCambioDTOList;
    }
}
