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


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crear-tramite', component: CrearTramiteComponent, canActivate: [authGuard] },
  { path: 'tabla-tramite', component: TablaTramiteComponent, canActivate: [authGuard] },
  { path: 'info-tramite', component: InfoTramiteComponent, canActivate: [authGuard] },
  { path: 'historial', component: HistorialComponent, canActivate: [authGuard] },
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [authGuard] },
  { path: 'auditoria', component: AuditoriaComponent, canActivate: [authGuard] },
  { path: 'notificacion', component: NotificacionComponent, canActivate: [authGuard] },
  { path: 'renovar', component: RenovarComponent, canActivate: [authGuard] },
  { path: 'modificar-nacional', component: ModificarNacionalComponent, canActivate: [authGuard] },
  { path: 'modificar-internacional', component: ModificarInternacionalComponent, canActivate: [authGuard] },
  { path: 'confirmacion', component: ConfirmacionComponent, canActivate: [authGuard] },
  { path: 'calendario', component: CalendarioComponent, canActivate: [authGuard] },
  { path: 'arrastrar', component: ArrastrarComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
