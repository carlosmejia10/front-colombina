import { Component } from '@angular/core';
import {FileService} from "@/app/servicios/file.service";
import {DocumentoDTO} from "@/app/modelos/DocumentoDTO";

@Component({
  selector: 'app-arrastrar',
  templateUrl: './arrastrar.component.html',
  styleUrls: ['./arrastrar.component.css']
})
export class ArrastrarComponent {
  fileName: string | null = null;
  selectedFile: File | null = null;  // Almacenar el archivo seleccionado
  idTramite: number = 123;  // Ejemplo de ID de trámite, ajusta este valor según corresponda

  constructor(private fileService: FileService) {}

  // Evento para manejar cuando se arrastra un archivo sobre la zona de drop
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
      uploadArea.classList.add('drag-over');
    }
  }

  // Evento para manejar cuando se deja de arrastrar
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
      uploadArea.classList.remove('drag-over');
    }
  }

  // Evento para manejar cuando se suelta el archivo en la zona de drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
      uploadArea.classList.remove('drag-over');
    }

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFile = file;
      this.fileName = `${file.name}`;
      event.dataTransfer.clearData();
    }
  }

  // Evento para manejar cuando se selecciona un archivo mediante el input
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.fileName = `${file.name}`;
    }
  }

  // Método para subir el archivo seleccionado
  subirArchivo(): void {
    console.log('Archivo seleccionado:', this.selectedFile);
    if (this.selectedFile) {
        // Crear el DTO con los datos requeridos
        const documentoDTO: DocumentoDTO = {
            id: undefined,                // O el valor que corresponda
            nombre: this.selectedFile.name,
            tipo: 'pdf',                 // Ajusta según el tipo de archivo real
            aprobado: false,
            cumpleNormativas: false,     // O el valor que corresponda
            file: this.selectedFile,
            tempUrl: undefined,          // O la URL temporal si la tienes
            fechaExpiracion: undefined    // O la fecha de expiración si la tienes
        };

        // Llamar al servicio para subir el archivo
        this.fileService.subirArchivo(documentoDTO, this.idTramite).subscribe(
            response => {
                console.log('Archivo subido con éxito', response);
                alert('Archivo subido con éxito');
            },
            error => {
                console.error('Error al subir el archivo', error);
                alert('Error al subir el archivo');
            }
        );
    } else {
        alert('No hay archivo seleccionado');
    }
}

}

