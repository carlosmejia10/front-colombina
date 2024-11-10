import { Component } from '@angular/core';
import { EstadisticasService } from '@/app/servicios/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticaComponent {
  // Datos para gráficos estáticos
  tramitesActivosData: any;
  tramitesNacionalesData: any;
  tramitesInternacionalesData: any;
  tramitesPorUsuarioData: any;
  tramitesTotalesData: any;
  registrosPorVencerData: any;
  inversionAnualData: any;
  tasaRechazosData: any;
  tasaRequerimientosData: any;
  tramitesInterNacionalesDataBarras:any;
  

  isEstatico: boolean = true;
 
  cuadros: number[] = [1]; // Inicia con un cuadro
  mostrarBoton: boolean = true; // Controla la visibilidad del botón
  graphOptions: Array<'bar' | 'line' | 'doughnut'> = ['bar', 'line', 'doughnut']; // Opciones válidas de gráficos para PrimeNG
  chartDataOptions: string[] = ['Trámites Activos', 'Trámites Rechazados', 'Trámites Nacionales', 'Trámites Internacionales', 'Todos los trámites'];
  chartBasisOptions: string[] = ['Productos', 'pais', 'Usuario', 'Meses']; // Opciones de base para graficar
  selectedOption1: Array<'bar' | 'line' | 'doughnut'> = []; // Asegurarse de que es un tipo de gráfico válido
  selectedOption2: string[] = []; // Selección del segundo combobox (qué graficar)
  selectedOption3: string[] = []; // Selección del tercer combobox (en función de qué)
  graficos: boolean[] = []; // Para controlar cuándo mostrar el gráfico
  graficoData: any[] = []; // Datos de gráficos
  chartOptions: any = {}; // Opciones para configurar el gráfico con PrimeNG
  chartOptionsHorizontal: any;
  chartOptionsDefault: any;
  chartOptionsStacked: any;

  totales: any;
  currentYear: number;

  constructor(private estadisticasService: EstadisticasService) {} // Inyectar el servicio

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    // Opciones generales
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    };

    // Opciones específicas para gráficas horizontales
    this.chartOptionsHorizontal = {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    };

    // Opciones por defecto para otras gráficas
    this.chartOptionsDefault = {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    };

    // Opciones para gráficos apilados
    this.chartOptionsStacked = {
      responsive: true,
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      },
      plugins: {
        legend: { position: 'bottom' }
      }
    };
    //Cargar datos

    this.obtenerTotales();
    this.cargarDatosGraficas();
  }

  toggle(): void {
    this.isEstatico = !this.isEstatico;
  }

  obtenerTotales() {
    this.estadisticasService.getTotales().subscribe(
      (data) => {
        this.totales = data;
      },
      (error) => {
        console.error('Error al obtener los totales', error);
      }
    );
  }

  addCuadro() {
    if (this.cuadros.length < 6) {
      this.cuadros.push(this.cuadros.length + 1); // Añade un nuevo cuadro
      this.selectedOption1.push('bar'); // Inicializa con un valor válido (por ejemplo, 'bar')
      this.selectedOption2.push(''); // Puedes seguir inicializando esto vacío si es necesario
      this.selectedOption3.push(''); // Puedes seguir inicializando esto vacío si es necesario
      this.graficos.push(false); // Añadir indicador de gráfico no mostrado
      this.graficoData.push({}); // Inicializar datos vacíos para el gráfico
    }

    if (this.cuadros.length === 6) {
      this.mostrarBoton = false; // Oculta el botón cuando hay 6 cuadros
    }
  }

  setTipo(tipo: string) {
    switch (tipo.toLowerCase()) {
      case 'nuevo registro sanitario nacional':
        return 'N.N.';
      case 'nuevo registro sanitario internacional':
        return 'N.I.';
      case 'modificación registro sanitario nacional':
        return 'M.N.';
      case 'modificación registro sanitario internacional':
        return 'M.I.';
      case 'renovación de registro sanitario':
        return 'R.';
      default:
        return tipo;
    }
  }

  removeCuadro(index: number) {
    this.cuadros.splice(index, 1); // Elimina el cuadro
    this.selectedOption1.splice(index, 1); // Elimina la selección correspondiente
    this.selectedOption2.splice(index, 1); // Elimina la selección correspondiente
    this.selectedOption3.splice(index, 1); // Elimina la selección correspondiente
    this.graficos.splice(index, 1); // Elimina el gráfico correspondiente
    this.graficoData.splice(index, 1); // Elimina los datos del gráfico

    if (this.cuadros.length < 6) {
      this.mostrarBoton = true; // Vuelve a mostrar el botón si hay menos de 6 cuadros
    }
  }

  generarGrafico(index: number) {
    const tipoGrafico = this.selectedOption1[index];
    const queGraficar = this.selectedOption2[index];
    const enFuncionDe = this.selectedOption3[index];

    // Llamar al servicio para obtener los datos según las selecciones
    this.estadisticasService.getChartData(queGraficar, enFuncionDe).subscribe(data => {
      this.graficoData[index] = {
        labels: data.labels,
        datasets: [
          { label: queGraficar, data: data.values, backgroundColor: data.colors }
        ]
      };
      this.graficos[index] = true;
    });
  }

  getButtonStyles() {
    if (this.cuadros.length === 1) {
      return {
        'grid-column': '2 / 3',
        'grid-row': '1 / 2',
      };
    } else if (this.cuadros.length === 2) {
      return {
        'grid-column': '3 / 4',
        'grid-row': '1 / 2',
      };
    } else if (this.cuadros.length === 3) {
      return {
        'grid-column': '1 / 2',
        'grid-row': '2 / 3',
      };
    } else if (this.cuadros.length === 4) {
      return {
        'grid-column': '2 / 3',
        'grid-row': '2 / 3',
      };
    } else if (this.cuadros.length === 5) {
      return {
        'grid-column': '3 / 4',
        'grid-row': '2 / 3',
      };
    }
    return {};
  }

  cargarDatosGraficas(): void {
    //***************************************************************************** OK*/
    this.estadisticasService.getChartData('Trámites Activos', 'Productos').subscribe(data => {
      data.labels = data.labels.map(this.setTipo)
      if (data.labels.length > 1 && data.values.length > 1) { // Verifica que haya más de un dato
        this.tramitesActivosData = {
          labels: data.labels,
          datasets: [{
            label: 'Trámites Activos',
            data: data.values,
            backgroundColor: data.labels.map(() => this.getRandomColor()) // Genera colores aleatorios
          }]
        };
      } else {
        console.warn('Solo se recibió un dato o los datos están incompletos.');
      }
    });
    
    //***************************************************************************** OK*/
    this.estadisticasService.getTramitesNacionalesActivosYCerradosPorProducto().subscribe(
      data => {
        data.labels = data.labels.map(this.setTipo)
        this.tramitesNacionalesData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Trámites activos',
              data: data.activos,
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            },
            {
              label: 'Trámites cerrados',
              data: data.cerrados,
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
          ]
        };
      },
      error => {
        console.error('Error al cargar datos de trámites nacionales', error);
      }
    );
    //************************************************************************************ OK */
    this.estadisticasService.getTramitesInternacionalesActivosYCerradosPorProducto().subscribe(
      data => {
        data.labels = data.labels.map(this.setTipo)
        this.tramitesInterNacionalesDataBarras = {
          labels: data.labels,
          datasets: [
            {
              label: 'Trámites activos',
              data: data.activos,
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            },
            {
              label: 'Trámites cerrados',
              data: data.cerrados,
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
          ]
        };
      },
      error => {
        console.error('Error al cargar datos de trámites nacionales', error);
      }
    );

    //INTERNACIONALES X PRODUCTOS ACTIVOS E INACTIVOS
    //************************************************************************************ OK*/
    

    this.estadisticasService.getChartData('Trámites Internacionales', 'pais').subscribe(data => {
      data.labels = data.labels.map(this.setTipo)
      this.tramitesInternacionalesData = {
        labels: data.labels,
        datasets: [{
          label: 'Trámites Internacionales',
          data: data.values,
          backgroundColor: data.labels.map(() => this.getRandomColor()) 
        }]
      };
    });

     //************************************************************************************ OK*/
    this.estadisticasService.getChartData('Trámites Activos', 'Usuario').subscribe(data => {
      data.labels = data.labels.map(this.setTipo)
      this.tramitesPorUsuarioData = {
        labels: data.labels,
        datasets: [{
          label: 'Trámites Activos',
          data: data.values,
          backgroundColor: data.labels.map(() => this.getRandomColor()) 
        }]
      };
    });

     //************************************************************************************ OK*/
     this.estadisticasService.getTramitesTotalesDelAnoActual().subscribe(data => {
      data.labels = data.labels.map(this.setTipo)
      this.tramitesTotalesData = {
        labels: data.labels, // Los nombres de los meses
        datasets: [{
          label: 'Trámites Totales',
          data: data.values, // Los valores de los trámites
          backgroundColor: data.labels.map(() => this.getRandomColor())
        }]
      };
    }, error => {
      console.error('Error al cargar los datos de los trámites totales del año actual:', error);
    });
    
     //************************************************************************************ FALTAN*/
   
     this.estadisticasService.getRegistrosPorVencer().subscribe(
      data => {
        data.labels = data.labels.map(this.setTipo)
        this.registrosPorVencerData = {
          labels: data.labels,
          datasets: [
            {
              label: 'Registros por Vencer',
              data: data.values,
              backgroundColor: 'rgba(153, 102, 255, 0.5)'
            }
          ]
        };
      },
      error => {
        console.error('Error al cargar datos de registros por vencer', error);
      }
    );
    
    
   
    //************************************************************************************ OK*/

    this.estadisticasService.getChartData('Tasa de rechazos', 'Productos').subscribe(data => {
      data.labels = data.labels.map(this.setTipo)
      if (data.labels.length > 1 && data.values.length > 1) { // Verifica que haya más de un dato
        this.tasaRechazosData = {
          labels: data.labels,
          datasets: [{
            label: 'Tasa de rechazos',
            data: data.values,
            backgroundColor: data.labels.map(() => this.getRandomColor()) // Genera colores aleatorios
          }]
        };
      } else {
        console.warn('Solo se recibió un dato o los datos están incompletos.');
      }
    });

     //************************************************************************************ OK*/
    this.estadisticasService.getChartData('Tasa de requerimientos', 'Productos').subscribe(data => {
      data.labels = data.labels.map(this.setTipo)
      this.tasaRequerimientosData = {
        labels: data.labels,
        datasets: [{
          label: 'Trámites de productos',
          data: data.values,
          backgroundColor: data.labels.map(() => this.getRandomColor()) // Genera colores aleatorios
        }]
      };
    });
  }


  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
