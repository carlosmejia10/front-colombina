import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../../../modelos/solicitud';
import { Tramite, EstadoTramite } from '../../../modelos/tramite';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['../../../app.component.css','./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  date: Date[] | undefined;
  selectedDate: Date = new Date();
  tramites: Tramite[] = []; // Lista de trámites cargados
  eventosDelDia: Tramite[] = []; // Trámites que coinciden con la fecha seleccionada

   constructor(){}

  ngOnInit(): void {
    // Cargar trámites de prueba
    this.tramites = [
      new Tramite(
        1,
        'AR-0001-2024',
        EstadoTramite.APROBADO,
        new Date('2024-10-01'),
        new Date('2024-10-19'),
        {} as any, // Entidad sanitaria (vacía para este ejemplo)
        [],
        [],
        [],
        [],
        new Solicitud(1, 'Producto A', 'Tipo A', new Date(), 'Tipo 1'),
        'Nacional'
      ),
      new Tramite(
        2,
        'AR-0002-2024',
        EstadoTramite.PENDIENTE,
        new Date('2024-10-05'),
        new Date('2024-11-15'),
        {} as any,
        [],
        [],
        [],
        [],
        new Solicitud(2, 'Producto B', 'Tipo B', new Date(), 'Tipo 1'),
        'Internacional'
      )
    ];

    // Al cargar el componente, mostrar los eventos del día seleccionado
    this.onDateSelect(this.selectedDate);
  }

  // Método que se ejecuta cuando se selecciona una fecha
  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.eventosDelDia = this.tramites.filter(tramite =>
      this.isSameDate(this.adjustDate(tramite.fechaRespuesta), this.selectedDate)
    );
  }

  // Ajustar fecha sumando un día
  adjustDate(date: Date): Date {
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    return adjustedDate;
  }

  hasEventOnDate(date: any): boolean {
    return this.tramites.some(tramite =>
      this.isSameDate(new Date(tramite.fechaRespuesta), new Date(date.year, date.month - 1, date.day))
    );
  }

  // Compara si dos fechas son iguales
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Método para agregar una clase a los días con eventos
  dayClass(date: any): string {
    return this.hasEventOnDate(date) ? 'event-day' : '';
  }
}

