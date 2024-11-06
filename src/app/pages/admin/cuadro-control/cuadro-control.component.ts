import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './cuadro-control.component.html',
  styleUrls: ['./cuadro-control.component.css']
})
export class CuadroControlComponent {
  // Array de datos para la tabla
  datosTabla = [
    { numeroRadicado: 'AR-1', estadoTramite: 'APROBADO', tipoTramite: 'NACIONAL' },
    { numeroRadicado: 'AR-2', estadoTramite: 'PENDIENTE', tipoTramite: 'INTERNACIONAL' },
    { numeroRadicado: 'AR-3', estadoTramite: 'RECHAZADO', tipoTramite: 'NACIONAL' }
  ];
}
