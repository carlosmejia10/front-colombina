import { Rol } from "./rol";

export class Usuario {
    id!:number;
    nombre!:string;
    contrasena!:string;
    rol!:Rol;
    correoElectronico!:string;
}
