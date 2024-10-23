export interface DocumentoDTO {
  name: string;
  tipo: string;
  aprobado: boolean;
  file: File;  // Es el tipo correcto para archivos en el frontend
}
