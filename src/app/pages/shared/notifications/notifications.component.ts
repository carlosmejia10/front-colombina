import { Notificacion } from '@/app/modelos/notificacion';
import { NotificacionService } from '@/app/servicios/notificacion.service';
import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notificaciones: Notificacion[] = [];
  usuarioId = 1; // ID de usuario para pruebas; ajusta según la lógica de tu aplicación

  constructor(
    private notificacionService: NotificacionService,
    private dialog: MatDialog
  ) { }

 /*
verDetalles(notificacionId: number): void {
  const dialogRef = this.dialog.open(DetalleNotificacionComponent, {
    data: { id: notificacionId }
  });
}
*/


  ngOnInit(): void {
    this.obtenerNotificaciones();
    this.generarGraficoDeNotificaciones();
  }

  calcularProgreso(): number {
    const totalNotificaciones = this.notificaciones.length;
    const leidas = this.contarNotificacionesLeidas();
    return totalNotificaciones > 0 ? (leidas / totalNotificaciones) * 100 : 0;
  }
  

  obtenerNotificaciones(): void {
    this.notificacionService.obtenerNotificacionesPorUsuario(this.usuarioId).subscribe({
      next: (data) => {
        this.notificaciones = data.map(notif => ({
          ...notif,
          fecha: new Date(notif.fecha) // Convertir string a Date
        }));
        console.log('Notificaciones:', this.notificaciones);
      },
      error: (error) => console.error('Error al obtener notificaciones:', error)
    });
  }

  marcarComoLeida(notificacionId: number): void {
    this.notificacionService.marcarNotificacionComoLeida(notificacionId).subscribe({
      next: () => {
        console.log('Notificación marcada como leída');
        this.obtenerNotificaciones(); // Refresca las notificaciones
      },
      error: (error) => console.error('Error al marcar como leída:', error)
    });
  }

  filtrarNotificaciones(estado: string): void {
    console.log(`Filtrando notificaciones por estado: ${estado}`);
    // Implementa la lógica para filtrar las notificaciones si es necesario
  }

  contarNotificacionesLeidas(): number {
    return this.notificaciones.filter(notif => notif.leida).length;
  }

  contarNotificacionesNoLeidas(): number {
    return this.notificaciones.filter(notif => !notif.leida).length;
  }

  generarGraficoDeNotificaciones(): void {
    const ctx = document.getElementById('notificationChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Leídas', 'No Leídas'],
        datasets: [{
          data: [this.contarNotificacionesLeidas(), this.contarNotificacionesNoLeidas()],
          backgroundColor: ['#28a745', '#dc3545']
        }]
      }
    });
  }
}
