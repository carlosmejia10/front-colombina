import { Notificacion } from '@/app/modelos/notificacion';
import { Usuario } from '@/app/modelos/usuario';
import { NotificacionService } from '@/app/servicios/notificacion.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notificaciones: any[] = [];
  usuarioId = 1; // ID de usuario para la prueba; puedes cambiarlo según tu lógica

  constructor(private notificacionService: NotificacionService) { }

  ngOnInit(): void {
    this.obtenerNotificaciones();
  }

  obtenerNotificaciones(): void {
    this.notificacionService.obtenerNotificacionesPorUsuario(this.usuarioId).subscribe({
      next: (data) => {
        this.notificaciones = data;
        console.log('Notificaciones:', data);
      },
      error: (error) => console.error('Error al obtener notificaciones:', error)
    });
  }
  

marcarComoLeida(notificacionId: number): void {
  this.notificacionService.marcarNotificacionComoLeida(notificacionId).subscribe({
    next: (response) => {
      console.log(response);
      this.obtenerNotificaciones(); // Refresca las notificaciones
    },
    error: (error) => console.error('Error al marcar como leída:', error)
  });
}
}
