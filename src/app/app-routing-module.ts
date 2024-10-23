import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArrastrarComponent } from './pages/solicitante/arrastrar/arrastrar.component';
import { AuditoriaComponent } from './pages/solicitante/auditoria/auditoria.component';
import { CalendarioComponent } from './pages/solicitante/calendario/calendario.component';
import { ConfirmacionComponent } from './pages/solicitante/confirmacion/confirmacion.component';
import { CrearTramiteComponent } from './pages/solicitante/crear-tramite/crear-tramite.component';
import { EstadisticasComponent } from './pages/admin/estadisticas/estadisticas.component';
import { HistorialComponent } from './pages/solicitante/historial/historial.component';
import { InfoTramiteComponent } from './pages/solicitante/info-tramite/info-tramite.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { ModificarInternacionalComponent } from './pages/solicitante/modificar-internacional/modificar-internacional.component';
import { ModificarNacionalComponent } from './pages/solicitante/modificar-nacional/modificar-nacional.component';
import { NotificacionComponent } from './pages/solicitante/notificacion/notificacion.component';
import { RenovarComponent } from './pages/solicitante/renovar/renovar.component';
import { TablaTramiteComponent } from './pages/solicitante/tabla-tramite/tabla-tramite.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { SolicitudesComponent } from './pages/asuntos-regulatorios/solicitudes/solicitudes.component';
import { Role } from './modelos/role';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'crear-tramite',
    component: CrearTramiteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'tabla-tramite',
    component: TablaTramiteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
  },
  {
    path: 'info-tramite',
    component: InfoTramiteComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Solitante] },
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
    path: 'notificacion',
    component: NotificacionComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: [
        Role.Solitante,
        Role.Admin,
        Role.AsuntosRegulatorios,
        Role.Mercadeo,
        Role.Exportaciones,
      ],
    },
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
    data: { roles: [Role.Solitante] },
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
    component: EstadisticasComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [Role.Admin] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
