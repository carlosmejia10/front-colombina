import { Notificacion } from '@/app/modelos/notificacion';
import { NotificacionService } from '@/app/servicios/notificacion.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  notificaciones: Notificacion[] = [];
  usuarioId = 1; // ID de usuario para pruebas; ajusta según la lógica de tu aplicación

  constructor(
    private notificacionService: NotificacionService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerNotificaciones();
  }

  ngAfterViewInit(): void {
    this.generarGraficoDeNotificaciones();
  }

  verDetalles(notificacionId: number): void {
    console.log(`Detalles de la notificación con ID: ${notificacionId}`);
    // Aquí puedes añadir la lógica para mostrar un modal o redirigir a otra vista
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
    if (ctx) {
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
    } else {
      console.error('Elemento canvas no encontrado');
    }
  }

  mostrarDetalles(notificacion: Notificacion) {
    this.router.navigate(['/notificacion/detail', notificacion.id]);
  }
}
