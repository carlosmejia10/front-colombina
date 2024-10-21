import { Component } from '@angular/core';
import { Notificacion } from '../../modelos/notificacion';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
  notificaciones:Notificacion[]=[{
    id:1,
    mensaje:"Creacion de tramite",
    fecha: new Date('15-08-2023'),
    destinatario:new Usuario
  },
  {
    id:1,
    mensaje:"Creacion de tramite",
    fecha: new Date('15-08-2023'),
    destinatario:new Usuario
  }
]

}
