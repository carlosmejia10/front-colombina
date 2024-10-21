import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArrastrarComponent } from './pages/arrastrar/arrastrar.component';
import { AuditoriaComponent } from './pages/auditoria/auditoria.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { CrearTramiteComponent } from './pages/crear-tramite/crear-tramite.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { InfoTramiteComponent } from './pages/info-tramite/info-tramite.component';
import { LoginComponent } from './pages/login/login.component';
import { ModificarInternacionalComponent } from './pages/modificar-internacional/modificar-internacional.component';
import { ModificarNacionalComponent } from './pages/modificar-nacional/modificar-nacional.component';
import { NotificacionComponent } from './pages/notificacion/notificacion.component';
import { RenovarComponent } from './pages/renovar/renovar.component';
import { TablaTramiteComponent } from './pages/tabla-tramite/tabla-tramite.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crear-tramite', component: CrearTramiteComponent },
  { path: 'tabla-tramite', component: TablaTramiteComponent },
  { path: 'info-tramite', component: InfoTramiteComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'auditoria', component: AuditoriaComponent },
  { path: 'notificacion', component: NotificacionComponent },
  { path: 'renovar', component: RenovarComponent },
  { path: 'modificar-nacional', component: ModificarNacionalComponent },
  { path: 'modificar-internacional', component: ModificarInternacionalComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'arrastrar', component: ArrastrarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
