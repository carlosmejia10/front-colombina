import { Component } from '@angular/core';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css'
})
export class AuditoriaComponent {
  solicitudes = [
    {
      numeroExpediente: '0001',
      fechaCambio: '23/03/2023',
      usuario: 'Depto. Regula',
      accionRealizada: 'Modificación de Documento',
      estado: 'Aprobado'
    },
    {
      numeroExpediente: '0002',
      fechaCambio: '14/02/2024',
      usuario: 'Depto. Regula',
      accionRealizada: 'Cambio de Estado',
      estado: 'Rechazada'
    },
    {
      numeroExpediente: '0003',
      fechaCambio: '15/08/2024',
      usuario: 'Depto. Regula',
      accionRealizada: 'Modificación de Documento',
      estado: 'Pendiente'
    },
    {
      numeroExpediente: '0004',
      fechaCambio: '21/06/2024',
      usuario: 'Depto. Regula',
      accionRealizada: 'Modificación de Documento',
      estado: 'Aprobado'
    },
    {
      numeroExpediente: '0005',
      fechaCambio: '04/03/2021',
      usuario: 'Depto. Regula',
      accionRealizada: 'Cambio de Estado',
      estado: 'Pendiente'
    }
  ];

  ngOnInit() {
    // Lógica adicional al inicializar el componente, si es necesaria
  }
}
