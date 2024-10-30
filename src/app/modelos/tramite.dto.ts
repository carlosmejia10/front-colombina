import { HistorialCambioDTO } from "./historialcambio.dto";

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
        historialCambioDTOList: HistorialCambioDTO[]
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
    }
}
