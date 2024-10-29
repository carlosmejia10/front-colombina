import { Usuario } from "./usuario";

export class NotificacionDto {
  public  id!:number;
  public  mensaje!:String;
  public  fecha!:Date;
  public  destinatario!:Usuario;

}
