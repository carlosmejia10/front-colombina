export class TramiteDTO {
    constructor(
        public id: number,
        public numeroRadicado: string,
        public nombreProducto: string,
        public descripcionProducto: string,
        public tipoProducto: string,
        public tipoTramite: string,
        public estado: string,
        public fechaRadicacion: Date,
        public progreso: number,
        public llave: number,
        public solicitanteId: number,  
        public entidadSanitariaId: number  
    ) {}
}

