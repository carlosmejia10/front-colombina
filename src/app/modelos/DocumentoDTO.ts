export interface DocumentoDTO {
  name: string;
  extension: string;  // Añadir la extensión
  tipo: string;
  aprobado: boolean;
  file: File;  // Es el tipo correcto para archivos en el frontend
}
