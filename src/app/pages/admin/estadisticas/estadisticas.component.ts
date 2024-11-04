import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { EstadisticasDTO } from '@/app/modelos/estadisticas-dto';
import { EstadisticasService } from '@/app/servicios/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent {
  basicData: any;
  basicData2: any;
  dataDocumentosDevueltos: any;
  optionsDocumentosDevueltos: any;
  basicOptions: any;
  dataTramNacionales: any;
  optionsTramNacionales: any;
  dataTramInter: any;
  optionsTramInter: any;

  constructor(private estadisticasService: EstadisticasService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


      this.basicData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [
          {
            label: 'Cantidad de trámites Internacionales',
            data: [300, 320, 500, 620],
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgb(255, 159, 64)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1,
          },
        ],
      };

          this.basicData2 = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
            datasets: [
              {
                label: 'Cantidad de trámites Internacionales',
                data: [300, 320, 500, 620],
                backgroundColor: [
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                  'rgb(255, 159, 64)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                ],
                borderWidth: 1,
              },
            ],
          };

          this.basicOptions = {
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false,
                },
              },
              x: {
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false,
                },
              },
            },
          };
          // Tramites nacionales
          this.dataDocumentosDevueltos = {
            labels: ['Ficha Técnica', 'Formato de solicitud', 'Certificados'],
            datasets: [
              {
                data: [300, 50, 100],
                backgroundColor: [
                  documentStyle.getPropertyValue('--blue-500'),
                  documentStyle.getPropertyValue('--yellow-500'),
                  documentStyle.getPropertyValue('--green-500'),
                ],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue('--blue-400'),
                  documentStyle.getPropertyValue('--yellow-400'),
                  documentStyle.getPropertyValue('--green-400'),
                ],
              },
            ],
          };

          this.optionsDocumentosDevueltos = {
            cutout: '50%',
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                },
              },
            },
          };

          //Tramites Nacionales al año

          this.dataTramNacionales = {
            labels: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
            ],
            datasets: [
              {
                label: 'Número trámites nacionales',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: [65, 59, 80, 81, 56, 55, 10],
              },
            ],
          };

          this.optionsTramNacionales = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                },
              },
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                },
              },
            },
          };

          //Tramites internacionales

          this.optionsTramInter = {
            stacked: false,
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
              legend: {
                labels: {
                  color: textColor,
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                },
              },
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                  color: textColorSecondary,
                },
                grid: {
                  color: surfaceBorder,
                },
              },
            },
          };
          this.dataTramInter = {
            labels: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
            ],
            datasets: [
              {
                label: 'Número trámites internacionales',
                fill: true,
                borderColor: documentStyle.getPropertyValue('--purple-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: [25, 20, 25, 29, 23, 25, 30],
              },
            ],
          };
        };
    }
  }

