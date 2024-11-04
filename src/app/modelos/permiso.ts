import { Rol } from "./rol";
import { Tramite } from "./tramite";

// permiso.model.ts
export class Permiso {
    id: number;
    tipoPermiso: TipoPermiso;
    usuario: Usuario;
    documento: Documento;

    constructor(id: number, tipoPermiso: TipoPermiso, usuario: Usuario, documento: Documento) {
      this.id = id;
      this.tipoPermiso = tipoPermiso;
      this.usuario = usuario;
      this.documento = documento;
    }
  }

  export enum TipoPermiso {
    LECTURA = 'LECTURA',
    ESCRITURA = 'ESCRITURA',
    ADMIN = 'ADMIN'
  }

  // Representación de las entidades relacionadas
  export class Usuario {
    id!:number;
    nombre!:string;
    contrasena!:string;
    rol!:Rol;
    correoElectronico!:string;
  }

  export class Documento {
    id!:number;
    tipo!:string;
    aprobado!:boolean;
    tempUrl!:string;
    tramite!:Tramite;
  }
