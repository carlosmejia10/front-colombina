import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '@/app/servicios/file.service';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { EntidadSanitariaService } from '@/app/servicios/entidad-sanitaria.service';
import { SolicitudDEIService } from '@/app/servicios/solicitud-dei.service';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { TramiteDTO } from '@/app/modelos/tramite.dto';
import { RequestTramiteSolicitudDTO } from '@/app/modelos/RequestTramiteSolicitudDTO';
import { Observable } from 'rxjs';
import { FileSizeComponent } from '../file-size/file-size.component';

@Component({
  selector: 'app-crear-tramite',
  templateUrl: './crear-tramite.component.html',
  styleUrls: ['./crear-tramite.component.css'],
})
export class CrearTramiteComponent implements OnInit {
  @ViewChild(FileSizeComponent, { static: false }) fileSizeComponent!: FileSizeComponent;

  // Opciones para los selectores
  tiposProducto: string[] = ['Nuevo Registro Sanitarios Nacional', 'Nuevo Registro Sanitario Internacional', 'Modificación Registro Sanitario Nacional', 'Modificación Registro Sanitario Internacional', 'Renovación de Registro Sanitario'];
  tiposTramiteColombina: string[] = ['Nuevo Registro Sanitarios Nacional', 'Nuevo Registro Sanitario Internacional', 'Modificación Registro Sanitario Nacional', 'Modificación Registro Sanitario Internacional', 'Renovación de Registro Sanitario'];
  tiposTramite: string[] = ['NACIONAL', 'INTERNACIONAL'];

  // Variables del formulario
  tipoTramiteSeleccionado: string = '';
  tipoProductoSeleccionado: string = '';
  nombreProducto: string = '';
  descripcionProducto: string = '';
  pais: string = '';
  idTramite: number = 1;

  // Lista de entidades sanitarias y países
  listaPaises: string[] = [];
  listaEntidadesSanitarias: EntidadSanitaria[] = [];
  entidadSanitariaId?: number;

  // Archivos y nombres seleccionados
  fileNames: { [key: string]: string[] | string | null } = {
    fichaTecnica: null,
    formatoInterno: null,
    certificadoAnalisis: null,
    certificadoAditivos: null,
    archivosAdicionales: [],
    muestrasEnvaseFisico: null,       // Nueva propiedad
    artesBocetosEnvase: null,         // Nueva propiedad
    muestrasProducto: null            // Nueva propiedad
  };
  selectedFiles: { [key: string]: File | File[] | null } = {
    fichaTecnica: null,
    formatoInterno: null,
    certificadoAnalisis: null,
    certificadoAditivos: null,
    archivosAdicionales: [],
    muestrasEnvaseFisico: null,       // Nueva propiedad
    artesBocetosEnvase: null,         // Nueva propiedad
    muestrasProducto: null            // Nueva propiedad
  };

  // Mapa para manejar mensajes de error
  errorMessages: { [key: string]: string | null } = {
    tipoTramite: null,
    nombreProducto: null,
    descripcionProducto: null,
    pais: null,
    tipoProducto: null,
    fichaTecnica: null,
    formatoInterno: null,
    certificadoAnalisis: null,
    certificadoAditivos: null,
    muestrasEnvaseFisico: null,       // Nueva propiedad
    artesBocetosEnvase: null,         // Nueva propiedad
    muestrasProducto: null            // Nueva propiedad
  };

  constructor(
    private fileService: FileService,
    private entidadSanitariaService: EntidadSanitariaService,
    private solicitudDEIService: SolicitudDEIService
  ) {}

  ngOnInit(): void {
    this.cargarEntidadesSanitarias();
  }

  cargarEntidadesSanitarias() {
    this.entidadSanitariaService
      .findAll()
      .subscribe((entidades: EntidadSanitaria[]) => {
        this.listaEntidadesSanitarias = entidades;
        this.setEntidad('Colombia');
        this.listaPaises = entidades
          .map((entidad) => entidad.pais)
          .filter((pais) => pais !== 'Colombia')
          .filter((pais, index, self) => self.indexOf(pais) === index);

        // Encontrar la entidad sanitaria para el país seleccionado
        const entidadSeleccionada = entidades.find(
          (entidad) => entidad.pais === this.pais
        );
        if (entidadSeleccionada) {
          this.entidadSanitariaId = entidadSeleccionada.id;
        }
      });
  }

  setEntidad(pais: string) {
    console.log(this.listaEntidadesSanitarias)
    const entidad = this.listaEntidadesSanitarias.find((entidad) => entidad.pais === pais);
    console.log('Entidad seleccionada:', entidad);
    if (entidad) {
      this.entidadSanitariaId = entidad.id;
    }
  }

  onTipoTramiteChange(tipoTramite: string) {
    if (tipoTramite === 'NACIONAL') {
      this.setEntidad('Colombia');
      this.pais = 'Colombia';
      this.listaPaises = [];
      this.tiposTramiteColombina = this.tiposProducto.filter(tipo => !tipo.toLowerCase().includes("internacional"));
    } else if (tipoTramite === 'INTERNACIONAL') {
      this.setEntidad('');
      this.pais = '';
      this.cargarEntidadesSanitarias();
      this.tiposTramiteColombina = this.tiposProducto.filter(tipo => !tipo.toLowerCase().includes(" nacional"));
    } else {
      this.tiposTramiteColombina = this.tiposProducto;
    }
  }

  // Método para crear la solicitud y el trámite
  crearSolicitudYTramite(): Observable<SolicitudDTO> {
    console.log('Creando solicitud y trámite...');
    // Validamos los campos requeridos
    if (
      !this.nombreProducto ||
      !this.descripcionProducto ||
      !this.tipoProductoSeleccionado ||
      !this.tipoTramiteSeleccionado
    ) {
      alert('Por favor complete todos los campos obligatorios.');
      return new Observable();
    }

    // Crear TramiteDTO
    const tramite = new TramiteDTO(
      this.nombreProducto,
      this.descripcionProducto,
      this.tipoProductoSeleccionado,
      this.tipoTramiteSeleccionado,
      'PENDIENTE', // estado inicial
      new Date(), // fecha de radicación
      0, // progreso inicial
      0, // llave (sin valor inicial, el backend debería generarlo)
      this.entidadSanitariaId,
      [] // historial de cambios vacío inicialmente
    );

    console.log(this.entidadSanitariaId);

    // Crear SolicitudDTO
    const solicitud = new SolicitudDTO(
      0, // El backend generará el ID de solicitud
      new Date() // fecha actual como fecha de solicitud
    );

    // Crear el RequestTramiteSolicitudDTO
    const request = new RequestTramiteSolicitudDTO(solicitud, tramite);

    // Llamar al servicio para crear la solicitud con trámite
    console.log('Antes de mandar a servicio:', request);
    return this.solicitudDEIService.crearSolicitudConTramite(request);
  }

  onSubmit(): void {
    this.resetErrorMessages();

    // Validación de campos requeridos
    if (!this.tipoTramiteSeleccionado)
      this.errorMessages.tipoTramite =
        'Por favor seleccione el tipo de trámite';
    if (!this.nombreProducto)
      this.errorMessages.nombreProducto =
        'Por favor ingrese el nombre del producto';
    if (!this.descripcionProducto)
      this.errorMessages.descripcionProducto =
        'Por favor ingrese la descripción del producto';
    if (!this.pais) this.errorMessages.pais = 'Por favor seleccione el país';
    if (!this.tipoProductoSeleccionado)
      this.errorMessages.tipoProducto =
        'Por favor seleccione el tipo de producto';
    if (!this.fileNames.fichaTecnica)
      this.errorMessages.fichaTecnica = 'Por favor adjunte la ficha técnica';
    if (!this.fileNames.formatoInterno)
      this.errorMessages.formatoInterno =
        'Por favor adjunte el formato interno';
    if (!this.fileNames.certificadoAnalisis)
      this.errorMessages.certificadoAnalisis =
        'Por favor adjunte el certificado de análisis';
    if (!this.fileNames.certificadoAditivos)
      this.errorMessages.certificadoAditivos =
        'Por favor adjunte el certificado de aditivos';
    
    // Validación para los nuevos archivos específicos de trámites INTERNACIONALES
    if (this.tipoTramiteSeleccionado === 'INTERNACIONAL') {
      if (!this.fileNames.muestrasEnvaseFisico)
        this.errorMessages.muestrasEnvaseFisico = 'Por favor adjunte las muestras de envase físico';
      if (!this.fileNames.artesBocetosEnvase)
        this.errorMessages.artesBocetosEnvase = 'Por favor adjunte los artes/bocetos de los envases';
      if (!this.fileNames.muestrasProducto)
        this.errorMessages.muestrasProducto = 'Por favor adjunte las muestras de producto';
    }

    const formIsValid = Object.values(this.errorMessages).every((error) => !error);
    if (!formIsValid) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    this.crearSolicitudYTramite().subscribe((solicitud) => {
      console.log('Solicitud creada:', solicitud);
      this.idTramite = solicitud.tramite.id;
      this.enviarArchivos();
    });
  }

  enviarArchivos(): void {
    Object.keys(this.selectedFiles).forEach((tipoArchivo) => {
      if (tipoArchivo !== 'archivosAdicionales') {
        const selectedFile = this.selectedFiles[tipoArchivo] as File;
        if (selectedFile) {
          this.subirArchivoIndividual(selectedFile, tipoArchivo);
        }
      }
    });

    const archivosAdicionales = this.selectedFiles['archivosAdicionales'] as File[];
    archivosAdicionales.forEach((file, index) => {
      this.subirArchivoIndividual(file, `archivosAdicionales-${index + 1}`);
    });
  }

  private resetErrorMessages(): void {
    Object.keys(this.errorMessages).forEach((key) => {
      this.errorMessages[key] = null;
    });
  }

  removeErrorMessage(field: string): void {
    this.errorMessages[field] = null;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = event.target as HTMLElement;
    uploadArea.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = event.target as HTMLElement;
    uploadArea.classList.remove('drag-over');
  }

  onDrop(event: DragEvent, tipoArchivo: string): void {
    event.preventDefault();
    const uploadArea = event.target as HTMLElement;
    uploadArea.classList.remove('drag-over');

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.selectedFiles[tipoArchivo] = file;
      this.fileNames[tipoArchivo] = file.name;
      event.dataTransfer.clearData();
      this.removeErrorMessage(tipoArchivo);
    }
  }

  onFileSelected(event: Event, tipoArchivo: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileSizeMB = file.size / (1024 * 1024);
      const allowedExtensions = ['pdf', 'docx', 'xlsx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        console.log('Formato de archivo no permitido');
        this.fileSizeComponent.openError('Formato de archivo no permitido. Solo se permiten archivos PDF, DOCX o XLSX.');
        return;
      }

      if (fileSizeMB > 2048) {
        console.log('El archivo excede el límite de 2GB, mostrando pop-up');
        this.fileSizeComponent.open(fileSizeMB);
        return;
      }

      this.selectedFiles[tipoArchivo] = file;
      this.fileNames[tipoArchivo] = file.name;
      this.removeErrorMessage(tipoArchivo);
    }
  }

  onFilesSelected(event: Event, tipoArchivo: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles[tipoArchivo] = Array.from(input.files);
      this.fileNames[tipoArchivo] = Array.from(input.files).map(
        (file) => file.name
      );
    }
  }

  onDropMultiple(event: DragEvent, tipoArchivo: string): void {
    event.preventDefault();
    const uploadArea = event.target as HTMLElement;
    uploadArea.classList.remove('drag-over');

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);
      this.selectedFiles[tipoArchivo] = files;
      this.fileNames[tipoArchivo] = files.map((file) => file.name);
      event.dataTransfer.clearData();
    }
  }

  removeFile(tipoArchivo: string): void {
    this.selectedFiles[tipoArchivo] = null;
    this.fileNames[tipoArchivo] = null;
  }

  removeAdditionalFile(index: number): void {
    const archivosAdicionales = this.selectedFiles['archivosAdicionales'] as File[];
    const nombresAdicionales = this.fileNames['archivosAdicionales'] as string[];
    if (archivosAdicionales && nombresAdicionales) {
      archivosAdicionales.splice(index, 1);
      nombresAdicionales.splice(index, 1);
    }
  }

  openFileInput(inputId: string): void {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.click();
  }

  private subirArchivoIndividual(file: File, tipoArchivo: string): void {
    const documentoDTO = new DocumentoDTO(false, false, file.name, file);
  
    this.fileService.subirArchivo(documentoDTO, this.idTramite).subscribe(
      (response) => {
        console.log(`Archivo ${tipoArchivo} subido con éxito`, response);
        this.fileSizeComponent.openSuccess(`Archivo ${tipoArchivo} subido con éxito`);
      },
      (error) => {
        console.error(`Error al subir el archivo ${tipoArchivo}`, error);
        this.fileSizeComponent.openError(`Error al subir el archivo ${tipoArchivo}`);
      }
    );
  }
}
