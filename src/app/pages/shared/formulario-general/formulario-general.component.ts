import { InfoAperturaTramite } from '@/app/modelos/info-apertura-tramite.dto';
import { SolicitudDTO } from '@/app/modelos/solicitud.dto';
import { TramiteService } from '@/app/servicios/tramite-regulatorio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-general',
  templateUrl: './formulario-general.component.html',
  styleUrls: ['./formulario-general.component.css'],
})
export class FormularioGeneralComponent implements OnInit {
  tramiteId: number;
  etapa: string;

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

  infoControl = {
    fechaNotificacion: new Date(),
    idSeguimiento: '',
    registroSanitario: '',
    expedienteRSA: '',
    numeroRSA: '',
    planta: '',
    numeroFactura: '',
    observaciones: '',
  };

  fechaTerminacion: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tramiteService: TramiteService
  ) {}

  ngOnInit(): void {
    // Obtener parámetros de la URL
    this.tramiteId = parseInt(this.route.snapshot.paramMap.get('idTramite'));
    this.tramiteService.findById(this.tramiteId).subscribe((data: SolicitudDTO) => {
      this.solicitud = data;
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
        !this.infoControl.registroSanitario ||
        !this.infoControl.expedienteRSA ||
        !this.solicitud.tramite.urgente ||
        !this.solicitud.tramite.numeroRSA ||
        !this.solicitud.tramite.fechaVencimientoRSA ||
        !this.infoControl.planta ||
        !this.infoControl.observaciones
      ) {
        alert('Por favor, complete todos los campos antes de continuar.');
        return;
      }
      const infoApertura = new InfoAperturaTramite(
        this.solicitud.tramite.pt,
        this.solicitud.tramite.unidadNegocio,
        this.solicitud.tramite.numProyectoSap,
        this.solicitud.tramite.proyecto,
        this.solicitud.tramite.tipoModificacion,
        this.infoControl.registroSanitario,
        this.infoControl.expedienteRSA,
        this.solicitud.tramite.urgente,
        this.solicitud.tramite.numeroRSA,
        this.solicitud.tramite.fechaVencimientoRSA,
        this.infoControl.planta,
        this.infoControl.observaciones
      );
      this.tramiteService.addInfoAperturaTramite(this.tramiteId, infoApertura).subscribe(() => {
        alert('Información de apertura guardada correctamente.');
        this.router.navigate([`/documentos/${this.tramiteId}`]);
      }, (error) => {
        console.error('Error al guardar la información de apertura', error);
        alert('Error al guardar la información de apertura. Por favor, inténtalo de nuevo.');
      });
    } else if (['A5', 'B5'].includes(this.etapa)) {
      this.router.navigate([`/seguimiento-tramite/${this.tramiteId}`]);
    } else if (['A6', 'B6'].includes(this.etapa)) {
      this.router.navigate([`/aprovacion-invima/${this.tramiteId}`]);
    } else if (['A7', 'B7', 'A9', 'B9'].includes(this.etapa)) {
      this.router.navigate([`/solicitudes`]);
    } else if (['consulta'].includes(this.etapa)) {
      this.router.navigate([`/tabla-tramites`]);
    } else {
      alert('No hay una navegación configurada para esta etapa.');
    }
  }
}
