import { Notificacion } from '@/app/modelos/notificacion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificacionService } from '@/app/servicios/notificacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-detail.component.html',
  styleUrl: './notification-detail.component.css',
})
export class NotificationDetailComponent implements OnInit {

  notificacion!: Notificacion;

  constructor(
    private route: ActivatedRoute,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Cargar detalles de la notificación
      console.log(`Fetching details for notificacion with ID: ${id}`);
      this.notificacionService.obtenerNotificacionPorId(+id).subscribe(
        data => {
          this.notificacion = {
            ...data,
            fecha: new Date(data.fecha) // Convertir a Date
          };
          console.log('Notification details fetched:', this.notificacion);
        },
        error => {
          console.error('Error fetching notificacion', error);
        }
      );      
    }
  }

}
