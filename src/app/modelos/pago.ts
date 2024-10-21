import {Tramite} from './tramite'
export class Pago {
    id!:number;
    monto!:number;
    referencia!:string;
    fechaPago!:Date;
    tramite!:Tramite;
}
