export class DocumentoDTO {
  id?: number; // Propiedad opcional
  tipo: string;
  aprobado: boolean | null;
  tempUrl?: string;  // Ruta temporal para acceso al archivo
  fechaExpiracion?: Date; // Utiliza el tipo Date para fechas
  cumpleNormativas: boolean;
  nombre: string;      // Nombre descriptivo del archivo o documento
  file: File;       // Tipo File para el archivo

  constructor(
    aprobado: boolean,
    cumpleNormativas: boolean,
    nombre: string,
    file: File,
    id?: number,
    fechaExpiracion?: Date
  ) {
    this.aprobado = aprobado;
    this.cumpleNormativas = cumpleNormativas;
    this.nombre = nombre;
    this.file = file;
    this.id = id;
    this.fechaExpiracion = fechaExpiracion;
  }
}
