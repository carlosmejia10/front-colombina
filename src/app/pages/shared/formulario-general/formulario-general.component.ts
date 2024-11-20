import { InfoAperturaTramite } from '@/app/modelos/info-apertura-tramite.dto';
import { InfoControlDTO } from '@/app/modelos/info-control.dto';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSizeComponent } from '../../solicitante/file-size/file-size.component';
import { DocumentoDTO } from '@/app/modelos/DocumentoDTO';
import { FileService } from '@/app/servicios/file.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-formulario-general',
  templateUrl: './formulario-general.component.html',
  styleUrls: ['./formulario-general.component.css'],
})
export class FormularioGeneralComponent implements OnInit {
  tramiteId: number;
  etapa: string;
  fileSizeComponent: FileSizeComponent
  loading: boolean = false;
  selectedFiles: { [key: string]: File | File[] | null } = {
    fichaTecnica: null,
    certificadoAnalisis: null,
    certificadoAditivos: null,
    muestrasEnvaseFisico: null,
    artesBocetosEnvase: null,
    muestrasProducto: null,
    archivosAdicionales: [],
  };

  fileNames: { [key: string]: string | string[] | null } = {
    fichaTecnica: null,
    certificadoAnalisis: null,
    certificadoAditivos: null,
    muestrasEnvaseFisico: null,
    artesBocetosEnvase: null,
    muestrasProducto: null,
    archivosAdicionales: [],
  };
  
  // Lista de campos habilitados para la etapa
  camposHabilitados: string[] = [];

  solicitud: SolicitudDTO = {
    tramite: {
      numeroRadicado: '',
      nombreProducto: '',
      pt: '',
      unidadNegocio: '',
      numProyectoSap: null,
      proyecto: '',
      tipoProducto: '',
      tipoModificacion: '',
      descripcionProducto: '',
      estado: '',
      entidadSanitaria: {
        id: null,
        nombre: '',
        pais: '',
      },
      expNum: null,
      llaveRSAColombia: '',
      fechaRadicacion: new Date(),
      urgente: false,
      fechaLlegadaResol: new Date(),
      okSatisfactorioInvima: false,
      numeroRSA: null,
      fechaVencimientoRSA: new Date(),
      tipoTramite: '',
      progreso: 0,
      llave: 0,
      etapa: '',
      historialCambioDTOList: [],
      fechaEnvioDocumentos: new Date(),
      solicitanteId: null,
      entidadSanitariaId: null,
    },
    solicitante: {
      nombre: '',
      rol: null,
      correoElectronico: '',
    },
    fechaSolicitud: new Date(),
    id: 0
  };

  fechaTerminacion: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tramiteService: TramiteService,
    private fileService:FileService
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la URL
    this.tramiteId = parseInt(this.route.snapshot.paramMap.get('idTramite'));
    this.tramiteService.findById(this.tramiteId).subscribe((data: SolicitudDTO) => {
      this.solicitud = data;
      this.solicitud.tramite.fechaVencimientoRSA = this.solicitud.tramite.fechaVencimientoRSA.toString().split('T')[0] as any;
    });
    this.etapa = this.route.snapshot.paramMap.get('etapa')!;

    // Definir los campos habilitados según la etapa
    if (['A2', 'B2', 'A3', 'B3'].includes(this.etapa)) {
      this.camposHabilitados = [
        'numeroRadicado',
        'nombreProducto',
        'pt',
        'unidadNegocio',
        'numProyectoSap',
        'proyecto',
        'tipoProducto',
        'tipoModificacion',
        'descripcionProducto',
        'fechaSolicitud',
        'pais',
        'registroSanitario',
        'expedienteRSA',
        'urgente',
        'rsaNsaPais',
        'vencimientoRSA',
        'solicitante',
        'planta',
        'observaciones',
        'estado',
      ];
      this.solicitud.tramite.fechaSolicitud = new Date();
    } else if (['A5', 'B5'].includes(this.etapa)) {
      this.camposHabilitados = [
        'fechaEnvioDocumentos',
        'idSeguimiento',
        'observaciones',
        'estado',
      ];
      this.solicitud.tramite.fechaEnvioDocumentos = new Date();
    } else if (['A6', 'B6'].includes(this.etapa)) {
      this.camposHabilitados = [
        'expNum',
        'llaveRSAColombia',
        'fechaRadicadoInvima',
        'estado',
        'observaciones',
      ];
    } else if (['A7', 'B7'].includes(this.etapa)) {
      this.camposHabilitados = [
        'expNum',
        'llaveRSAColombia',
        'fechaRadicadoInvima',
        'estado',
        'observaciones',
      ];
    } else if (['A9', 'B9'].includes(this.etapa)) {
      this.camposHabilitados = [
        'okSatisfactorioInvima',
        'estado',
        'rsaNsaPais',
        'observaciones',
      ];
    } else if (['consulta'].includes(this.etapa)) {
      this.camposHabilitados = ['rsaNsaPais', 'estado', 'observaciones'];
    }
  }

  // Método para verificar si un campo está habilitado en la etapa actual
  esCampoHabilitado(campo: string): boolean {
    return this.camposHabilitados.includes(campo);
  }

  // Navegar al siguiente componente según la etapa actual
  siguiente(): void {
    if (['A2', 'B2', 'A3', 'B3'].includes(this.etapa)) {
      // Navegar a RevisionDocumentacionComponent con el ID del trámite
      if (
        !this.solicitud.tramite.pt ||
        !this.solicitud.tramite.unidadNegocio ||
        !this.solicitud.tramite.numProyectoSap ||
        !this.solicitud.tramite.proyecto ||
        !this.solicitud.tramite.tipoModificacion ||
        !this.solicitud.tramite.registroSanitario ||
        !this.solicitud.tramite.expedienteRSA ||
        !this.solicitud.tramite.numeroRSA ||
        !this.solicitud.tramite.fechaVencimientoRSA ||
        !this.solicitud.tramite.planta
      ) {
        alert('Por favor, complete todos los campos obligatorios antes de continuar.');
        return;
      }
      const infoApertura = new InfoAperturaTramite(
        this.solicitud.tramite.pt,
        this.solicitud.tramite.unidadNegocio,
        this.solicitud.tramite.numProyectoSap,
        this.solicitud.tramite.proyecto,
        this.solicitud.tramite.tipoModificacion,
        this.solicitud.tramite.registroSanitario,
        this.solicitud.tramite.expedienteRSA,
        this.solicitud.tramite.urgente,
        this.solicitud.tramite.numeroRSA,
        this.solicitud.tramite.fechaVencimientoRSA,
        this.solicitud.tramite.planta,
        this.solicitud.tramite.observaciones
      );
      this.tramiteService.addInfoAperturaTramite(this.tramiteId, infoApertura).subscribe(() => {
        alert('Información de apertura guardada correctamente.');
        this.router.navigate([`/documentos/${this.tramiteId}`]);
      }, (error) => {
        console.error('Error al guardar la información de apertura', error);
        alert('Error al guardar la información de apertura. Por favor, inténtalo de nuevo.');
      });
    } else if (['A5', 'B5'].includes(this.etapa)) {
      if (
        !this.solicitud.tramite.fechaEnvioDocumentos ||
        !this.solicitud.tramite.idSeguimiento
      ) {
        alert('Por favor, complete todos los campos obligatorios antes de continuar.');
        return;
      }
      const infoControl = new InfoControlDTO(
        this.solicitud.tramite.fechaEnvioDocumentos,
        this.solicitud.tramite.idSeguimiento,
        this.solicitud.tramite.observaciones
      );
      this.tramiteService.addInfoControlTramite(this.tramiteId, infoControl).subscribe(() => {
        alert('Información de control guardada correctamente.');
        this.router.navigate([`/seguimiento-tramite/${this.tramiteId}`]);
      }, (error) => {
        console.error('Error al guardar la información de control', error);
        alert('Error al guardar la información de control. Por favor, inténtalo de nuevo.');
      });
    } else if (['A6', 'B6'].includes(this.etapa)) {
      this.router.navigate([`/aprovacion-invima/${this.tramiteId}`]);
    } else if (['A7', 'B7', 'A9', 'B9'].includes(this.etapa)) {
      this.router.navigate([`/solicitudes`]);
    } else if (['consulta'].includes(this.etapa)) {
      this.router.navigate([`/tabla-tramites`]);
    } else {
      alert('No hay una navegación configurada para esta etapa.');
    }

    this.enviarArchivos().subscribe(
      (response) => {
        console.log('Archivos subidos:', response);
        this.loading = false;
      },
      (error) => {
        console.error('Error al subir archivos:', error);
        alert('Error al subir archivos');
      }
    )
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
      
    }
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

  private subirArchivoIndividual(
    file: File,
    tipoArchivo: string
  ): Observable<any> {
    console.log(`Subiendo archivo ${tipoArchivo}:`, file);
    const documentoDTO = new DocumentoDTO(false, false, file.name, file);
    return this.fileService.subirArchivo(documentoDTO, this.tramiteId);
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

}
