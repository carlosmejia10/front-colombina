import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-general',
  templateUrl: './formulario-general.component.html',
  styleUrls: ['./formulario-general.component.css']
})
export class FormularioGeneralComponent implements OnInit {
  tramiteId: number;
  etapa: string;

  // Lista de campos habilitados para la etapa
  camposHabilitados: string[] = [];

  solicitud = {
    tramite: {
      numeroRadicado: '',
      nombreProducto: '',
      pt: '',
      unidadNegocio: '',
      numProyectoSap: '',
      proyecto: '',
      tipoProducto: '',
      tipoModificacion: '',
      descripcionProducto: '',
      estado: '',
      entidadSanitaria: {
        pais: '',
      },
      expNum: '',
      llaveRSAColombia: '',
      fechaRadicadoInvima: new Date(),
      urgente: false,
      fechaLlegadaResol: new Date(),
      okSatisfactorioInvima: false,
      rsaNsaPais: '',
      vencimientoRSA: new Date(),
    },
    solicitante: {
      nombre: ''
    },
    fechaSolicitud: new Date(),
    fechaEnvioDocumentos: new Date(),
  };

  infoControl = {
    fechaNotificacion: new Date(),
    idSeguimiento: '',
    registroSanitario: '',
    expedienteRSA: '',
    numeroRSA: '',
    planta: '',
    numeroFactura: '',
    observaciones: ''
  };

  fechaTerminacion: Date = new Date();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtener parámetros de la URL
    this.tramiteId = parseInt(this.route.snapshot.paramMap.get('idTramite'));
    console.log("Tramite id:"+ this.tramiteId);
    this.etapa = this.route.snapshot.paramMap.get('etapa')!;

    // Definir los campos habilitados según la etapa
    if (['A2', 'B2', 'A3', 'B3'].includes(this.etapa)) {
      this.camposHabilitados = [
        'numeroRadicado', 'nombreProducto', 'pt', 'unidadNegocio', 'numProyectoSap', 'proyecto',
        'tipoProducto', 'tipoModificacion', 'descripcionProducto', 'fechaSolicitud',
        'pais', 'registroSanitario', 'expedienteRSA', 'urgente', 'rsaNsaPais',
        'vencimientoRSA', 'solicitante', 'planta', 'observaciones', 'estado'
      ];
    } else if (['A5', 'B5'].includes(this.etapa)) {
      this.camposHabilitados = ['fechaEnvioDocumentos', 'idSeguimiento', 'observaciones', 'estado'];
    } else if (['A6', 'B6'].includes(this.etapa)) {
      this.camposHabilitados = ['expNum', 'llaveRSAColombia', 'fechaRadicadoInvima', 'estado', 'observaciones'];
    } else if (['A7', 'B7'].includes(this.etapa)) {
      this.camposHabilitados = ['expNum', 'llaveRSAColombia', 'fechaRadicadoInvima', 'estado', 'observaciones'];
    } else if (['A9', 'B9'].includes(this.etapa)) {
      this.camposHabilitados = ['okSatisfactorioInvima', 'estado', 'rsaNsaPais', 'observaciones'];
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
      this.router.navigate([`/documentos/${this.tramiteId}`]);
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
