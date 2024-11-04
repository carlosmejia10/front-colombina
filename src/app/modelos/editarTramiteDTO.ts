export class EditarTramiteDTO {
    constructor(
        public id?: number,
        public etapa?: number,
        public fechaRadicacion?: Date,
        public llave?: number,
        public numProyectoSap?: number,
        public progreso?: number,
        public entidadSanitariaId?: number,
        public solicitudId?: number,
        public claseTramite?: string,
        public descripcionProducto?: string,
        public descripcionTramite?: string,
        public estadoTramite?: string, // Cambiado de estado a estadoTramite
        public nombreProducto?: string,
        public numeroRadicado?: string,
        public proyecto?: string,
        public pt?: string,
        public tipoModificacion?: string,
        public tipoProducto?: string,
        public tipoTramite?: string,
        public unidadNegocio?: string,
        public fechaSolicitud?: Date,
        public solicitanteId?: number
    ) {}

    static fromJSON(json: any): EditarTramiteDTO {
        return new EditarTramiteDTO(
            json.id,
            json.etapa,
            json.fechaRadicacion ? new Date(json.fechaRadicacion) : undefined,
            json.llave,
            json.numProyectoSap,
            json.progreso,
            json.entidadSanitariaId,
            json.solicitudId,
            json.claseTramite,
            json.descripcionProducto,
            json.descripcionTramite,
            json.estado || json.estadoTramite, // Maneja ambos nombres
            json.nombreProducto,
            json.numeroRadicado,
            json.proyecto,
            json.pt,
            json.tipoModificacion,
            json.tipoProducto,
            json.tipoTramite,
            json.unidadNegocio,
            json.fechaSolicitud ? new Date(json.fechaSolicitud) : undefined,
            json.solicitanteId
        );
    }

    toJSON(): any {
        return {
            id: this.id,
            etapa: this.etapa,
            fechaRadicacion: this.fechaRadicacion,
            llave: this.llave,
            numProyectoSap: this.numProyectoSap,
            progreso: this.progreso,
            entidadSanitariaId: this.entidadSanitariaId,
            solicitudId: this.solicitudId,
            claseTramite: this.claseTramite,
            descripcionProducto: this.descripcionProducto,
            descripcionTramite: this.descripcionTramite,
            estado: this.estadoTramite, // Mapea estadoTramite a estado para el backend
            nombreProducto: this.nombreProducto,
            numeroRadicado: this.numeroRadicado,
            proyecto: this.proyecto,
            pt: this.pt,
            tipoModificacion: this.tipoModificacion,
            tipoProducto: this.tipoProducto,
            tipoTramite: this.tipoTramite,
            unidadNegocio: this.unidadNegocio,
            fechaSolicitud: this.fechaSolicitud,
            solicitanteId: this.solicitanteId
        };
    }
}