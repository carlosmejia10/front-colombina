import { Component } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  solicitudes = [
    {
      producto: 'Salsa Tomate',
      pais: 'Colombia',
      tipoTramite: 'Modificación Registro Sanitario Nacional',
      estado: 'Aprobado'
    },
    {
      producto: 'Bom bom bum',
      pais: 'Estados Unidos',
      tipoTramite: 'Renovación Registro Sanitario Internacional',
      estado: 'Rechazada'
    },
    {
      producto: 'Chomelos',
      pais: 'Panamá',
      tipoTramite: 'Nuevo Registro Sanitario Internacional',
      estado: 'Pendiente'
    },
    {
      producto: 'ChocoBreak',
      pais: 'Colombia',
      tipoTramite: 'Modificación Registro Sanitario Nacional',
      estado: 'Pendiente'
    }
  ];
}
