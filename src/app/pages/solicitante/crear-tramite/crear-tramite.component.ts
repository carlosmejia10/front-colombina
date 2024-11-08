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
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-tramite',
  templateUrl: './crear-tramite.component.html',
  styleUrls: ['./crear-tramite.component.css'],
})
export class CrearTramiteComponent implements OnInit {
  @ViewChild(FileSizeComponent, { static: false })
  fileSizeComponent!: FileSizeComponent;
  tiposTramite: string[] = ['MODIFICAR', 'NUEVO REGISTRO', 'RENOVACION'];
  tiposTramiteNacionalidad: string[] = ['NACIONAL', 'INTERNACIONAL'];
  tipoModificacionSeleccionado: string = '';
  pais: string = '';
  nombreProducto: string = '';
  descripcionTramite: string = '';
  SubCategoria: string = '';
  Riesgo: string = '';
  RegNotPer: string = '';
  listaPaises: string[] = [];
  loading: boolean = false;

  listaModificaciones = [
    { nombre: 'DE RAZON SOCIAL', cambio: false, adicion: false },
    { nombre: 'DE FABRICANTE', cambio: false, adicion: false },
    { nombre: 'DE EMPACADOR', cambio: false, adicion: false },
    { nombre: 'DE UBICACION', cambio: false, adicion: false },
    { nombre: 'DE IMPORTADOR', cambio: false, adicion: false },
    { nombre: 'DE MARCA COMERCIAL', cambio: false, adicion: false },
    { nombre: 'DE NOMBRE DEL PRODUCTO', cambio: false, adicion: false },
    { nombre: 'DE COMPOSICION DEL PRODUCTO', cambio: false, adicion: false },
    { nombre: 'DE PRESENTACION COMERCIAL', cambio: false, adicion: false },
    {
      nombre: 'MODIFICACION DE MODALIDAD DE RSAP/RSNSA',
      cambio: false,
      adicion: false,
    },
    { nombre: 'OTROS', cambio: false, adicion: false },
    { nombre: 'EMPAQUE', cambio: false, adicion: false },
    { nombre: 'VIDA UTIL', cambio: false, adicion: false },
  ];

  fileNames: { [key: string]: string | string[] | null } = {
    fichaTecnica: null,
    certificadoAnalisis: null,
    certificadoAditivos: null,
    muestrasEnvaseFisico: null,
    artesBocetosEnvase: null,
    muestrasProducto: null,
    archivosAdicionales: [],
  };

  selectedFiles: { [key: string]: File | File[] | null } = {
    fichaTecnica: null,
    certificadoAnalisis: null,
    certificadoAditivos: null,
    muestrasEnvaseFisico: null,
    artesBocetosEnvase: null,
    muestrasProducto: null,
    archivosAdicionales: [],
  };

  errorMessages: { [key: string]: string | null } = {
    tipoModificacion: null,
    pais: null,
    nombreProducto: null,
    descripcionTramite: null,
    SubCategoria: null,
    Riesgo: null,
    RegNotPer: null,
    fichaTecnica: null,
    certificadoAditivos: null,
  };

  // Opciones para los selectores
  tiposProducto: string[] = [
    'Nuevo Registro Sanitarios Nacional',
    'Nuevo Registro Sanitario Internacional',
    'Modificación Registro Sanitario Nacional',
    'Modificación Registro Sanitario Internacional',
    'Renovación de Registro Sanitario',
  ];
  tiposTramiteColombina: string[] = this.tiposProducto;

  // Variables del formulario
  tipoTramiteSeleccionado: string = '';
  tipoProductoSeleccionado: string = '';
  descripcionProducto: string = '';
  idTramite: number = 1;

  // Lista de entidades sanitarias y países
  listaEntidadesSanitarias: EntidadSanitaria[] = [];
  entidadSanitariaId?: number;

  constructor(
    private fileService: FileService,
    private entidadSanitariaService: EntidadSanitariaService,
    private solicitudDEIService: SolicitudDEIService,
    private router: Router
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
    const entidad = this.listaEntidadesSanitarias.find(
      (entidad) => entidad.pais === pais
    );
    if (entidad) {
      this.entidadSanitariaId = entidad.id;
    }
  }

  onTipoTramiteChange(tipoTramite: string) {
    if (tipoTramite === 'NACIONAL') {
      this.setEntidad('Colombia');
      this.pais = 'Colombia';
      this.listaPaises = [];
      this.tiposTramiteColombina = this.tiposProducto.filter(
        (tipo) => !tipo.toLowerCase().includes('internacional')
      );
    } else if (tipoTramite === 'INTERNACIONAL') {
      this.setEntidad('');
      this.pais = '';
      this.cargarEntidadesSanitarias();
      this.tiposTramiteColombina = this.tiposProducto.filter(
        (tipo) => !tipo.toLowerCase().includes(' nacional')
      );
    } else {
      this.tiposTramiteColombina = this.tiposProducto;
    }
  }

  crearSolicitudYTramite(): Observable<SolicitudDTO> {
    // Validamos los campos requeridos
    let camposFaltantes = [];

    if (!this.nombreProducto) {
      camposFaltantes.push('Nombre del producto');
    }

    if (!this.descripcionProducto) {
      camposFaltantes.push('Descripción del producto');
    }

    if (!this.tipoTramiteSeleccionado) {
      camposFaltantes.push('Tipo de producto');
    }

    if (!this.tipoModificacionSeleccionado) {
      camposFaltantes.push('Tipo de modificación');
    }

    if (camposFaltantes.length > 0) {
      alert(
        'Por favor complete los siguientes campos obligatorios: ' +
          camposFaltantes.join(', ')
      );
      return new Observable();
    }

    // Crear TramiteDTO
    const tramite = new TramiteDTO(
      this.nombreProducto,
      this.descripcionProducto,
      this.tipoModificacionSeleccionado,
      this.tipoTramiteSeleccionado,
      'PENDIENTE', // estado inicial
      new Date(), // fecha de radicación
      0, // progreso inicial
      0, // llave (sin valor inicial, el backend debería generarlo)
      this.entidadSanitariaId,
      [] // historial de cambios vacío inicialmente
    );

    // Crear SolicitudDTO
    const solicitud = new SolicitudDTO(
      0, // El backend generará el ID de solicitud
      new Date() // fecha actual como fecha de solicitud
    );

    // Crear el RequestTramiteSolicitudDTO``
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
    if (!this.fileNames.fichaTecnica)
      this.errorMessages.fichaTecnica = 'Por favor adjunte la ficha técnica';
    if (!this.tipoModificacionSeleccionado)
      this.errorMessages.tipoModificacion =
        'Por favor seleccione el tipo de modificación';

    const formIsValid = Object.values(this.errorMessages).every(
      (error) => !error
    );
    if (!formIsValid) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    this.loading = true;
    this.crearSolicitudYTramite().subscribe((solicitud) => {
      console.log('Solicitud creada:', solicitud);
      this.idTramite = solicitud.tramite.id;
      this.enviarArchivos().subscribe(
        (response) => {
          console.log('Archivos subidos:', response);
          alert('Trámite creado correctamente');
          this.loading = false;
          this.router.navigate(['/tabla-tramite']);
        },
        (error) => {
          console.error('Error al subir archivos:', error);
          alert('Error al subir archivos');
        }
      )
    });
  }

  enviarArchivos(): Observable<any> {
    console.log('Enviando archivos:', this.selectedFiles);
    const observablesFiles = Object.keys(this.selectedFiles).map(
      (tipoArchivo) => {
        if (tipoArchivo !== 'archivosAdicionales') {
          if (this.selectedFiles[tipoArchivo]) {
            const file = this.selectedFiles[tipoArchivo] as File;
            return this.subirArchivoIndividual(file, tipoArchivo);
          }
        }
        return null;
      }
    ).filter((observables) => observables !== null);

    const archivosAdicionales = this.selectedFiles[
      'archivosAdicionales'
    ] as File[];
    const observablesAditionalFiles = archivosAdicionales.map((file, index) => {
      return this.subirArchivoIndividual(
        file,
        `archivosAdicionales-${index + 1}`
      );
    });
    const observables = observablesFiles.concat(observablesAditionalFiles);

    return new Observable((observer) => {
      let count = 0;
      observables.forEach((observable) => {
        if (observable) {
          observable.subscribe(
            (response) => {
              console.log('Archivo subido:', response);
              count++;
              if (count === observables.length) {
                observer.next('Archivos subidos correctamente');
                observer.complete();
              }
            },
            (error) => {
              console.error('Error al subir archivo:', error);
              observer.error('Error al subir archivo');
            }
          );
        }
      });
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

  removeFile(tipoArchivo: string): void {
    this.selectedFiles[tipoArchivo] = null;
    this.fileNames[tipoArchivo] = null;
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

      if (!this.selectedFiles[tipoArchivo]) {
        this.selectedFiles[tipoArchivo] = [];
      }

      this.selectedFiles[tipoArchivo] = file;

      // Update fileNames with the name of the last added file
      this.fileNames[tipoArchivo] = file.name;

      event.dataTransfer.clearData();
      this.removeErrorMessage(tipoArchivo);
    }
  }

  onDropMultiple(event: DragEvent): void {
    event.preventDefault();
    const uploadArea = event.target as HTMLElement;
    uploadArea.classList.remove('drag-over');

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);

      // Update selectedFiles to hold the list of dropped files
      this.selectedFiles.archivosAdicionales = (
        this.selectedFiles.archivosAdicionales as File[]
      ).concat(files);

      // Update fileNames to hold an array of file names
      this.fileNames.archivosAdicionales = (
        this.fileNames.archivosAdicionales as string[]
      ).concat(files.map((file) => file.name));

      event.dataTransfer.clearData();
    }
  }

  removeAdditionalFile(index: number): void {
    const archivosAdicionales = this.selectedFiles[
      'archivosAdicionales'
    ] as File[];
    const nombresAdicionales = this.fileNames[
      'archivosAdicionales'
    ] as string[];
    if (archivosAdicionales && nombresAdicionales) {
      archivosAdicionales.splice(index, 1);
      nombresAdicionales.splice(index, 1);
    }
  }

  openFileInput(inputId: string): void {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.click();
  }

  private subirArchivoIndividual(
    file: File,
    tipoArchivo: string
  ): Observable<any> {
    console.log(`Subiendo archivo ${tipoArchivo}:`, file);
    const documentoDTO = new DocumentoDTO(false, false, file.name, file);

    return this.fileService.subirArchivo(documentoDTO, this.idTramite);
  }

  onTipoModificacionChange(tipoTramite: string): void {
    this.tipoModificacionSeleccionado = tipoTramite;
    if (tipoTramite === 'MODIFICAR') {
      this.listaModificaciones.forEach((mod) => {
        mod.cambio = false;
        mod.adicion = false;
      });
    }
  }

  verDatosSolicitante(): void {
    alert('Mostrando datos del solicitante.');
  }

  onFileSelected(event: Event, tipoArchivo: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileSizeMB = file.size / (1024 * 1024);
      const allowedExtensions = ['pdf', 'docx', 'doc', 'xlsx', 'xls', 'png', 'jpg', 'jpeg'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        console.log('Formato de archivo no permitido');
        this.fileSizeComponent.openError(
          'Formato de archivo no permitido. Solo se permiten archivos PDF, DOCX o XLSX.'
        );
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

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles.archivosAdicionales = (
        this.selectedFiles.archivosAdicionales as File[]
      ).concat(Array.from(input.files));

      this.fileNames.archivosAdicionales = (
        this.fileNames.archivosAdicionales as string[]
      ).concat(Array.from(input.files).map((file) => file.name));
    }
  }
}
