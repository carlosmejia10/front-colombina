import { Notificacion } from '@/app/modelos/notificacion';
import { Usuario } from '@/app/modelos/usuario';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  notificaciones: Notificacion[] = [
    {
      id: 1,
      mensaje: 'Creacion de tramite',
      fecha: new Date('15-08-2023'),
      destinatario: new Usuario(),
    },
    {
      id: 1,
      mensaje: 'Creacion de tramite',
      fecha: new Date('15-08-2023'),
      destinatario: new Usuario(),
    },
  ];
}
