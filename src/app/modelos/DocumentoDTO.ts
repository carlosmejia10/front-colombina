export class DocumentoDTO {
  id?: number; // Propiedad opcional
  tipo: string;
  aprobado: boolean;
  tempUrl?: string;  // Ruta temporal para acceso al archivo
  fechaExpiracion?: Date; // Utiliza el tipo Date para fechas
  cumpleNormativas: boolean;
  name: string;      // Nombre descriptivo del archivo o documento
  file: File;       // Tipo File para el archivo

  constructor(
    tipo: string,
    aprobado: boolean,
    cumpleNormativas: boolean,
    name: string,
    file: File,
    id?: number,
    tempUrl?: string,
    fechaExpiracion?: Date
  ) {
    this.tipo = tipo;
    this.aprobado = aprobado;
    this.cumpleNormativas = cumpleNormativas;
    this.name = name;
    this.file = file;
    this.id = id;
    this.tempUrl = tempUrl;
    this.fechaExpiracion = fechaExpiracion;
  }
}
