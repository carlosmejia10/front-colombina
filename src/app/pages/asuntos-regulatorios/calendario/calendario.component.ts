import { Component, OnInit } from '@angular/core';
import { TramiteService } from '../../../servicios/tramite-regulatorio.service';
import { TramiteDTO } from '../../../modelos/tramite.dto';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';




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
  public events: any[];
  public options: any;
  // Variables para mostrar información seleccionada
  selectedEventTitle: string = '';
  selectedEventDescription: string = '';

  constructor(private tramiteService: TramiteService) { }

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

    this.events = [{
      title: "Evento 1",
      start: new Date(),
      end: new Date(new Date().getTime() + (86400000* 2)),
      description: "Evento 1"
    },
    {
      title: "Evento 3",
      start: new Date(new Date().getTime() + (86400000* 8)),
      end: new Date(new Date().getTime() + (86400000* 10)),
      description: "Evento 3"
    },
    {
      title: "Evento 2",
      start: new Date(),
      description: "Evento 3"
    }
    ];
    
    this.options = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: this.events,
      locale: esLocale, // Configura el idioma a español
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      titleFormat: { year: 'numeric', month: 'long' }, 
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día'
      }
    };
   
  }

  // Método que se ejecuta cuando se selecciona un evento
  onEventClick(info: any) {
    // Actualizar las variables con los datos del evento
    this.selectedEventTitle = info.event.title;
    this.selectedEventDescription = info.event.extendedProps.description;
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
