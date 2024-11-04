import{Tramite} from './tramite'
import { Usuario } from './usuario';
export class Solicitud {
    id!:number;
    descripcionProducto!:string;
    tipoProducto!:string;
    fechaSolicitud!:Date;
    solicitante?:Usuario;
    tramite?:Tramite;

    constructor(id: number, descripcion: string, tipoProducto:string,fechaSolicitud: Date, tipoSolicitud: string) {
        this.id = id;
        this.descripcionProducto = descripcion;
        this.tipoProducto=tipoProducto;
        this.fechaSolicitud = fechaSolicitud;
      }
}
