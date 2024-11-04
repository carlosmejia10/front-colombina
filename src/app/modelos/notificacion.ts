import { Usuario } from "./usuario";

export class Notificacion {
    public  id!:number;
    public  mensaje!:String;
    public  fecha!:Date;
    public  asunto: string;
    public  leida: boolean;
}
