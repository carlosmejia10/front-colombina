export class EstadisticasDTO {
  mes: number;        // Representa el mes (0 = enero, 1 = febrero, etc.)
  cantidad: number;   // Cantidad de documentos devueltos
  tipo: string;       // Tipo de trámite (nacional o internacional)

  constructor(mes: number, cantidad: number, tipo: string) {
    this.mes = mes;
    this.cantidad = cantidad;
    this.tipo = tipo;
  }
}
