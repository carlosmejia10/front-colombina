import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule

import { AppRoutingModule } from './app-routing-module';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';

//componentes de la aplicación
import { AppComponent } from './app.component';
import { ArrastrarComponent } from './pages/solicitante/arrastrar/arrastrar.component';
import { AuditoriaComponent } from './pages/solicitante/auditoria/auditoria.component';
import { CalendarioComponent } from './pages/solicitante/calendario/calendario.component';
import { ConfirmacionComponent } from './pages/solicitante/confirmacion/confirmacion.component';
import { CrearTramiteComponent } from './pages/solicitante/crear-tramite/crear-tramite.component';
import { EstadisticasComponent } from './pages/solicitante/estadisticas/estadisticas.component';
import { HistorialComponent } from './pages/solicitante/historial/historial.component';
import { InfoTramiteComponent } from './pages/solicitante/info-tramite/info-tramite.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { ModificarInternacionalComponent } from './pages/solicitante/modificar-internacional/modificar-internacional.component';
import { ModificarNacionalComponent } from './pages/solicitante/modificar-nacional/modificar-nacional.component';
import { NotificacionComponent } from './pages/solicitante/notificacion/notificacion.component';
import { RenovarComponent } from './pages/solicitante/renovar/renovar.component';
import { TablaTramiteComponent } from './pages/solicitante/tabla-tramite/tabla-tramite.component';
import { BarraOpcComponent } from './components/barra-opc/barra-opc.component';
import { HeaderComponent } from './components/header/header.component';
import { LateralComponent } from './components/lateral/lateral.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IgxDropDownModule } from 'igniteui-angular';

import { EstadisticasService } from './servicios/estadisticas.service';

@NgModule({
  declarations: [
    AppComponent,
    ArrastrarComponent,
    AuditoriaComponent,
    CalendarioComponent,
    ConfirmacionComponent,
    CrearTramiteComponent,
    EstadisticasComponent,
    HistorialComponent,
    InfoTramiteComponent,
    LoginComponent,
    ModificarInternacionalComponent,
    ModificarNacionalComponent,
    NotificacionComponent,
    RenovarComponent,
    TablaTramiteComponent,
    BarraOpcComponent,
    HeaderComponent,
    LateralComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule, // Agrega HttpClientModule a la lista de imports
    CalendarModule,
    FormsModule,
    CommonModule,
    ChartModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimations(),
    IgxDropDownModule,
    EstadisticasService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
