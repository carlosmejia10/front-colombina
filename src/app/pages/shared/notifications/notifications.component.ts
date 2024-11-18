import { Notificacion } from '@/app/modelos/notificacion';
import { NotificacionService, Page } from '@/app/servicios/notificacion.service';
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
  page: number = 0; // Página actual
  size: number = 10; // Tamaño de la página
  totalPages: number = 0; // Total de páginas

  constructor(
    private notificacionService: NotificacionService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerNotificacionesPaginadas();
  }

  ngAfterViewInit(): void {
    this.generarGraficoDeNotificaciones();
  }

  verDetalles(notificacionId: number): void {
    console.log(`Detalles de la notificación con ID: ${notificacionId}`);
  }

  calcularProgreso(): number {
    const totalNotificaciones = this.notificaciones.length;
    const leidas = this.contarNotificacionesLeidas();
    return totalNotificaciones > 0 ? (leidas / totalNotificaciones) * 100 : 0;
  }

  obtenerNotificaciones(): void {
    this.notificacionService.obtenerNotificacionesPorUsuario().subscribe({
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

  obtenerNotificacionesPaginadas(): void {
    this.notificacionService.obtenerNotificacionesPorUsuarioConPaginacion(this.page, this.size).subscribe({
      next: (data: Page<Notificacion>) => {
        this.notificaciones = data.content.map(notif => ({
          ...notif,
          fecha: new Date(notif.fecha) // Convertir string a Date
        }));
        this.totalPages = data.totalPages;
        console.log('Notificaciones:', this.notificaciones);
      },
      error: (error) => console.error('Error al obtener notificaciones:', error)
    });
  }

  marcarComoLeida(notificacionId: number): void {
    const notificacion = this.notificaciones.find(notif => notif.id === notificacionId);
  
    if (notificacion && !notificacion.leida) {
      this.notificacionService.marcarNotificacionComoLeida(notificacionId).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response.mensaje);
          notificacion.leida = true; // Actualiza el estado localmente
        },
        error: (error) => {
          console.error('Error al marcar como leída:', error);
          alert('No se pudo actualizar la notificación. Intenta nuevamente.');
        }
      });
    }
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

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.obtenerNotificacionesPaginadas();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.obtenerNotificacionesPaginadas();
    }
  }

  limitChange(event: Event): void {
    this.size = +(event.target as HTMLSelectElement).value;
    this.page = 0; // Reinicia a la primera página
    this.obtenerNotificacionesPaginadas();
  }
}
