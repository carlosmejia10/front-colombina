import { Component } from '@angular/core';
import { EstadisticasService } from '@/app/servicios/estadisticas.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent {
 
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

  
  totales: any;

  constructor(private estadisticasService: EstadisticasService) {} // Inyectar el servicio

  ngOnInit(): void {
    this.obtenerTotales();
  }

  obtenerTotales() {
    this.estadisticasService.getTotales().subscribe(
      (data) => {
        console.log('Totales recibidos:', data); // Verifica los datos recibidos
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
      this.mostrarBoton = false; // Oculta el botón cuando hay 4 cuadros
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
      this.mostrarBoton = true; // Vuelve a mostrar el botón si hay menos de 4 cuadros
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

}
