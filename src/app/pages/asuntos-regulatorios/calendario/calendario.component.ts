import { Component, OnInit } from '@angular/core';
import { TramiteRegulatorioService } from '../../../servicios/tramite-regulatorio.service';
import { TramiteDTO } from '../../../modelos/tramite.dto';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['../../../app.component.css', './calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  date: Date[] | undefined;
  selectedDate: Date = new Date();
  tramites: TramiteDTO[] = []; // Lista de trámites cargados desde el backend
  eventosDelDia: TramiteDTO[] = []; // Trámites que coinciden con la fecha seleccionada

  constructor(private tramiteService: TramiteRegulatorioService) {}

  ngOnInit(): void {
    // Cargar trámites desde el backend usando TramiteService
    this.tramiteService.findAll().subscribe(
      (data: TramiteDTO[]) => {
        this.tramites = data;
        // Mostrar los eventos del día seleccionado
        this.onDateSelect(this.selectedDate);
      },
      (error) => {
        console.error("Error al cargar trámites: ", error);
      }
    );
  }

  // Método que se ejecuta cuando se selecciona una fecha
  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.eventosDelDia = this.tramites.filter(tramite =>
      this.isSameDate(new Date(tramite.fechaRadicacion), this.selectedDate)
    );
  }

  hasEventOnDate(date: any): boolean {
    return this.tramites.some(tramite =>
      this.isSameDate(new Date(tramite.fechaRadicacion), new Date(date.year, date.month - 1, date.day))
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
