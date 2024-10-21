import { Tramite } from './tramite';

export class EntidadSanitaria {
  id!: number;
  nombre!: string;
  pais!: string;
  tramites?: Tramite[];
}
