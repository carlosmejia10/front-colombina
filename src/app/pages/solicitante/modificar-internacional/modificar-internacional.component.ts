import { Component, OnInit, ViewChild } from '@angular/core';
import { EntidadSanitariaService } from '@/app/servicios/entidad-sanitaria.service';
import { EntidadSanitaria } from '@/app/modelos/entidad-sanitaria';
import { FileSizeComponent } from '../file-size/file-size.component';
import { FileService } from '@/app/servicios/file.service';

@Component({
  selector: 'app-modificar-internacional',
  templateUrl: './modificar-internacional.component.html',
  styleUrls: ['./modificar-internacional.component.css']
})
export class ModificarInternacionalComponent implements OnInit {
  @ViewChild(FileSizeComponent, { static: false }) fileSizeComponent!: FileSizeComponent;

  tiposTramite: string[] = ['MODIFICAR', 'NUEVO REGISTRO', 'RENOVACION'];
  tipoModificacionSeleccionado: string = '';
  pais: string = '';
  nombreProducto: string = '';
  descripcionTramite: string = '';  // Nueva propiedad
  SubCategoria: string = '';
  Riesgo: string = '';
  RegNotPer: string = '';
  listaPaises: string[] = [];

  listaModificaciones = [
    { nombre: 'DE TITULAR', cambio: false, adicion: false },
    { nombre: 'DE RAZON SOCIAL', cambio: false, adicion: false },
    { nombre: 'DE FABRICANTE', cambio: false, adicion: false },
    { nombre: 'DE EMPACADOR', cambio: false, adicion: false },
    { nombre: 'DE UBICACION', cambio: false, adicion: false },
    { nombre: 'DE IMPORTADOR', cambio: false, adicion: false },
    { nombre: 'DE MARCA COMERCIAL', cambio: false, adicion: false },
    { nombre: 'DE NOMBRE DEL PRODUCTO', cambio: false, adicion: false },
    { nombre: 'DE COMPOSICION DEL PRODUCTO', cambio: false, adicion: false },
    { nombre: 'DE PRESENTACION COMERCIAL', cambio: false, adicion: false },
    { nombre: 'MODIFICACION DE MODALIDAD DE RSAP/RSNSA', cambio: false, adicion: false },
    { nombre: 'OTROS', cambio: false, adicion: false },
    { nombre: 'EMPAQUE', cambio: false, adicion: false },
    { nombre: 'VIDA UTIL', cambio: false, adicion: false }
  ];

  fileNames: { [key: string]: string | null } = {
    fichaTecnica: null,
    certificadoAditivos: null,
  };
  selectedFiles: { [key: string]: File | null } = {
    fichaTecnica: null,
    certificadoAditivos: null,
  };

  errorMessages: { [key: string]: string | null } = {
    tipoModificacion: null,
    pais: null,
    nombreProducto: null,
    descripcionTramite: null,  // Nueva propiedad para manejo de errores
    SubCategoria : null,
    Riesgo: null,
    RegNotPer: null,
    fichaTecnica: null,
    certificadoAditivos: null,
  };

  constructor(
    private fileService: FileService,
    private entidadSanitariaService: EntidadSanitariaService) {}

  ngOnInit(): void {
    this.cargarEntidadesSanitarias();
  }

  cargarEntidadesSanitarias(): void {
    this.entidadSanitariaService.findAll().subscribe(
      (entidades: EntidadSanitaria[]) => {
        this.listaPaises = entidades
          .map(entidad => entidad.pais)
          .filter((pais, index, self) => self.indexOf(pais) === index);
      },
      (error) => {
        console.error('Error al cargar los países', error);
      }
    );
  }

  onTipoModificacionChange(tipoTramite: string): void {
    this.tipoModificacionSeleccionado = tipoTramite;
    if (tipoTramite === 'MODIFICAR') {
      this.listaModificaciones.forEach(mod => {
        mod.cambio = false;
        mod.adicion = false;
      });
    }
  }

  verDatosSolicitante(): void {
    alert('Mostrando datos del solicitante.');
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

  removeErrorMessage(field: string): void {
    this.errorMessages[field] = null;
  }

  onSubmit(): void {
    this.resetErrorMessages();

    // Validaciones
    if (!this.tipoModificacionSeleccionado) this.errorMessages.tipoModificacion = 'Por favor seleccione el tipo de modificación';
    if (!this.pais) this.errorMessages.pais = 'Por favor seleccione el país';
    if (!this.nombreProducto) this.errorMessages.nombreProducto = 'Por favor ingrese el nombre del producto';
    if (!this.descripcionTramite) this.errorMessages.descripcionTramite = 'Por favor ingrese la descripción del trámite';
    if(!this.SubCategoria) this.errorMessages.SubCategoria = 'Por favor seleccione la subcategoria';
    if(!this.Riesgo) this.errorMessages.Riesgo = 'Por favor seleccione el riesgo';
    if(!this.RegNotPer) this.errorMessages.RegNotPer = 'Por favor seleccione el registro, notificación o permiso';

    const formIsValid = Object.values(this.errorMessages).every(error => !error);
    if (!formIsValid) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    alert('Formulario enviado exitosamente');
  }

  private resetErrorMessages(): void {
    Object.keys(this.errorMessages).forEach((key) => {
      this.errorMessages[key] = null;
    });
  }

  removeFile(tipoArchivo: string): void {
    this.selectedFiles[tipoArchivo] = null;
    this.fileNames[tipoArchivo] = null;
  }
}
