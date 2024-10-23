import { Component, OnInit } from '@angular/core';
import { FileService } from '@/app/servicios/file.service';
import { saveAs } from 'file-saver';
import { Tramite } from '@/app/modelos/tramite';  // Importar la función saveAs para descargar archivos
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';

@Component({
  selector: 'app-info-tramite',
  templateUrl: './info-tramite.component.html',
  styleUrls: ['./info-tramite.component.css']
})
export class InfoTramiteComponent implements OnInit {
  tramite!: Tramite;
  mostrarBoton: boolean = true;
  archivos: DocumentoDTO[] = [];  // Lista de archivos desde el backend
  mostrarTodos: boolean = false;  // Para manejar la visualización de más archivos

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.cargarArchivos();
    this.cargarTramite();  // Método para cargar el trámite
  }

  isLoading: boolean = true;

  cargarArchivos(): void {
    const idTramite = 123;
    this.isLoading = true;
    this.fileService.obtenerArchivos(idTramite).subscribe(
      (archivos: DocumentoDTO[]) => {
        this.archivos = archivos;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener los archivos', error);
        alert('Error al intentar obtener los archivos.');
        this.isLoading = false;
      }
    );
  }

  cargarTramite(): void {

  }



  // Método para descargar un archivo con su extensión
  descargarArchivo(filename: string): void {
    const idTramite = 123;  // ID del trámite (ajusta según sea necesario)

    // Asegurarnos de que siempre tenga extensión PDF
    const fullFileName = `${filename}.pdf`;

    // Llamada al servicio para descargar el archivo
    this.fileService.descargarArchivo(idTramite, fullFileName).subscribe(
      (blob: Blob) => {
        if (blob.size === 0) {
          console.error('Error: Archivo vacío descargado');
          alert('Error: El archivo descargado está vacío.');
          return;
        }
        saveAs(blob, fullFileName);  // Utilizamos la librería file-saver para descargar el archivo
      },
      error => {
        console.error('Error al descargar el archivo', error);
        alert('Error al intentar descargar el archivo.');
      }
    );
  }


  // Método para mostrar u ocultar los archivos adicionales
  toggleMostrarTodos(): void {
    this.mostrarTodos = !this.mostrarTodos;
  }

  escalarTramite(): void {
    alert(`El trámite con número de radicado ${this.tramite.numeroRadicado} ha sido escalado.`);
    this.mostrarBoton = false;
  }



}
