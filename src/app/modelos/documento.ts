import { Tramite } from "./tramite";

export class Documento {
    id!:number;
    tipo!:string;
    aprobado!:boolean;
    tempUrl!:string;
    tramite?:Tramite;
}
