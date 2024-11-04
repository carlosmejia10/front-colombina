export class EditarTramiteDTO {
    constructor(
        public id?: number,
        public fechaSolicitud?: Date,
        public fechaEnvioDocumentos?: Date,
        public fechaTerminacionTramite?: Date,
        public fechaNotificacion?: Date,
        public fechaRadicacion?: Date,
        public fechaRadicadoINVIMA?: Date,
        public fechaLlegadaResolucion?: Date,
        public vencimientoRSA?: Date,
        
        public numeroRadicado?: string,
        public estado?: string,
        public pais?: string,
        public registroSanitarioColombia?: string,
        public expedienteRSA?: string,
        public numeroIntencion?: string,
        public radicadoExp?: string,
        public llaveRSAColombia?: string,
        public numeroRSAPais?: string,
        public solicitadoPor?: string,
        public planta?: string,
        public observaciones?: string,
        public pagadoFacturaNo?: string,
        
        public esUrgente?: boolean,
        public okSatisfactorioINVIMA?: boolean,
        
        public etapa?: number,
        public llave?: number,
        public numProyectoSap?: number,
        public progreso?: number,
        public entidadSanitariaId?: number,
        public tipoTramite?: string,
        public descripcionProducto?: string,
        public tipoProducto?: string
    ) {}

    static fromJSON(json: any): EditarTramiteDTO {
        return new EditarTramiteDTO(
            json.id,
            json.fechaSolicitud ? new Date(json.fechaSolicitud) : undefined,
            json.fechaEnvioDocumentos ? new Date(json.fechaEnvioDocumentos) : undefined,
            json.fechaTerminacionTramite ? new Date(json.fechaTerminacionTramite) : undefined,
            json.fechaNotificacion ? new Date(json.fechaNotificacion) : undefined,
            json.fechaRadicacion ? new Date(json.fechaRadicacion) : undefined,
            json.fechaRadicadoINVIMA ? new Date(json.fechaRadicadoINVIMA) : undefined,
            json.fechaLlegadaResolucion ? new Date(json.fechaLlegadaResolucion) : undefined,
            json.vencimientoRSA ? new Date(json.vencimientoRSA) : undefined,
            
            json.numeroRadicado,
            json.estado,
            json.pais,
            json.registroSanitarioColombia,
            json.expedienteRSA,
            json.numeroIntencion,
            json.radicadoExp,
            json.llaveRSAColombia,
            json.numeroRSAPais,
            json.solicitadoPor,
            json.planta,
            json.observaciones,
            json.pagadoFacturaNo,
            
            json.esUrgente,
            json.okSatisfactorioINVIMA,
            
            json.etapa,
            json.llave,
            json.numProyectoSap,
            json.progreso,
            json.entidadSanitariaId,
            json.tipoTramite,
            json.descripcionProducto,
            json.tipoProducto
        );
    }

    toJSON(): any {
        return {
            id: this.id,
            fechaSolicitud: this.fechaSolicitud,
            fechaEnvioDocumentos: this.fechaEnvioDocumentos,
            fechaTerminacionTramite: this.fechaTerminacionTramite,
            fechaNotificacion: this.fechaNotificacion,
            fechaRadicacion: this.fechaRadicacion,
            fechaRadicadoINVIMA: this.fechaRadicadoINVIMA,
            fechaLlegadaResolucion: this.fechaLlegadaResolucion,
            vencimientoRSA: this.vencimientoRSA,
            
            numeroRadicado: this.numeroRadicado,
            estado: this.estado,
            pais: this.pais,
            registroSanitarioColombia: this.registroSanitarioColombia,
            expedienteRSA: this.expedienteRSA,
            numeroIntencion: this.numeroIntencion,
            radicadoExp: this.radicadoExp,
            llaveRSAColombia: this.llaveRSAColombia,
            numeroRSAPais: this.numeroRSAPais,
            solicitadoPor: this.solicitadoPor,
            planta: this.planta,
            observaciones: this.observaciones,
            pagadoFacturaNo: this.pagadoFacturaNo,
            
            esUrgente: this.esUrgente,
            okSatisfactorioINVIMA: this.okSatisfactorioINVIMA,
            
            etapa: this.etapa,
            llave: this.llave,
            numProyectoSap: this.numProyectoSap,
            progreso: this.progreso,
            entidadSanitariaId: this.entidadSanitariaId,
            tipoTramite: this.tipoTramite,
            descripcionProducto: this.descripcionProducto,
            tipoProducto: this.tipoProducto
        };
    }
}