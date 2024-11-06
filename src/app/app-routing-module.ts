import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArrastrarComponent } from './pages/solicitante/arrastrar/arrastrar.component';
import { AuditoriaComponent } from './pages/solicitante/auditoria/auditoria.component';
import { CalendarioComponent } from './pages/asuntos-regulatorios/calendario/calendario.component';
import { ConfirmacionComponent } from './pages/solicitante/confirmacion/confirmacion.component';
import { CrearTramiteComponent } from './pages/solicitante/crear-tramite/crear-tramite.component';
import { HistorialComponent } from './pages/solicitante/historial/historial.component';
import { InfoTramiteComponent } from './pages/solicitante/info-tramite/info-tramite.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { ModificarInternacionalComponent } from './pages/solicitante/modificar-internacional/modificar-internacional.component';
import { ModificarNacionalComponent } from './pages/solicitante/modificar-nacional/modificar-nacional.component';
import { NotificacionesSolicitanteComponent } from './pages/solicitante/notificaciones-solicitante/notificaciones-solicitante.component';
import { RenovarComponent } from './pages/solicitante/renovar/renovar.component';
import { TablaTramiteComponent } from './pages/solicitante/tabla-tramite/tabla-tramite.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { SolicitudesComponent } from './pages/asuntos-regulatorios/solicitudes/solicitudes.component';
import { Role } from './modelos/role';
import { NotificacionesArComponent } from './pages/asuntos-regulatorios/notificaciones-ar/notificaciones-ar.component';
import { EstadisticaComponent } from './pages/admin/estadistica/estadistica.component';
import { RevisionDocumentacionComponent } from './pages/asuntos-regulatorios/revision-documentacion/revision-documentacion.component';
import { DocumentoEscogidoComponent } from './pages/asuntos-regulatorios/documento-escogido/documento-escogido.component';
import { PerfilComponent } from './pages/shared/perfil/perfil.component';
import { ConceptoSatisfactorioComponent } from '@/app/pages/asuntos-regulatorios/concepto-satisfactorio/concepto-satisfactorio.component';
import { NotificationsComponent } from '@/app/pages/shared/notifications/notifications.component';
import { AprobacionInvimaComponent } from '@/app/pages/asuntos-regulatorios/aprobacion-invima/aprobacion-invima.component';
import { AperturaTramiteComponent } from './pages/asuntos-regulatorios/apertura-tramite/apertura-tramite.component';
import { InfoSolicitudComponent } from './pages/asuntos-regulatorios/info-solicitud/info-solicitud.component';
import {
  AprobacionResolucionSolicitanteComponent
} from "@/app/pages/asuntos-regulatorios/aprobacion-resolucion-solicitante/aprobacion-resolucion-solicitante.component";
import {
  AutorequerimientoComponent
} from "@/app/pages/asuntos-regulatorios/autorequerimiento/autorequerimiento.component";
import {
  AprobacionSolicitanteComponent
} from "@/app/pages/solicitante/aprobacion-solicitante/aprobacion-solicitante.component";
import {
  AprobacionResolucionRechazadaComponent
} from "@/app/pages/asuntos-regulatorios/aprobacion-resolucion-rechazada/aprobacion-resolucion-rechazada.component";
import { InfoControlComponent } from './pages/asuntos-regulatorios/info-control/info-control.component';
import {AsignacionRadicadoLlaveComponent} from "@/app/pages/asuntos-regulatorios/asignacion-radicado-llave/asignacion-radicado-llave.component";
import {
  SeguimientoTramiteComponent
} from "@/app/pages/asuntos-regulatorios/seguimiento-tramite/seguimiento-tramite.component";
import {
  RevisionPreliminarComponent
} from "@/app/pages/asuntos-regulatorios/revision-preliminar/revision-preliminar.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'crear-tramite',
    component: CrearTramiteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {path: 'notificaciones', component: NotificationsComponent},
  {
    path: 'tabla-tramite',
    component: TablaTramiteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'info-tramite/:id',
    component: InfoTramiteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'info-solicitud/:id',
    component: InfoSolicitudComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.AsuntosRegulatorios, Role.Admin] },
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'auditoria',
    component: AuditoriaComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'notificaciones/solicitante',
    component: NotificacionesSolicitanteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'notificaciones/asuntos-regulatorios',
    component: NotificacionesArComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.AsuntosRegulatorios] },
  },
  {
    path: 'renovar',
    component: RenovarComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'modificar-nacional',
    component: ModificarNacionalComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'modificar-internacional',
    component: ModificarInternacionalComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'confirmacion',
    component: ConfirmacionComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'calendario',
    component: CalendarioComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.AsuntosRegulatorios] },
  },
  {
    path: 'arrastrar',
    component: ArrastrarComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.AsuntosRegulatorios] },
  },
  {
    path: 'estadisticas',
    component: EstadisticaComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'documentos/:id',
    component: RevisionDocumentacionComponent,
  },
  {
    path: `revision/:numeroRadicado/:id`,
    component: DocumentoEscogidoComponent,
  },
  {
    path:`perfil`,
    component: PerfilComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante, Role.AsuntosRegulatorios, Role.Admin] }, //Usuario no logueado no puede acceder
  },

  {
    path: `info-control/:numeroRadicado`,
    component: InfoControlComponent,
  },
  {
    path: `aprobacion-invima/:numeroRadicado`,
    component: AprobacionInvimaComponent,
  },

  {
    path:`aprobacion-resolucion-solicitante`,
    component: AprobacionResolucionSolicitanteComponent,
  },

  {
    path: `autorequerimiento`,
    component: AutorequerimientoComponent,
  },

  {
    path: `concepto-satisfactorio`,
    component: ConceptoSatisfactorioComponent,
  },

  {
    path: `aprobacion-solicitante`,
    component: AprobacionSolicitanteComponent,
  },

  {
    path: `apertura-tramite/:numeroRadicado`,
    component: AperturaTramiteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.AsuntosRegulatorios] },
  },

  {
    path: `aprobacion-resolucion-rechazada`,
    component: AprobacionResolucionRechazadaComponent,
  },

  {
    path: `asignacion-radicado-llave`,
    component: AsignacionRadicadoLlaveComponent,
  },

  {
    path: `seguimiento-tramite`,
    component: SeguimientoTramiteComponent,
  },

  {
    path: `revision-preliminar`,
    component: RevisionPreliminarComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
