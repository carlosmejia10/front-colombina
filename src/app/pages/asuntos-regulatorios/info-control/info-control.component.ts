import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import { TramiteRegulatorioService } from '../../../servicios/tramite-regulatorio.service';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from "@/app/config/environment/urls";
import { EditarTramiteDTO } from "@/app/modelos/editarTramiteDTO";



@Component({
  selector: 'app-info-control',
  templateUrl: './info-control.component.html',
  styleUrls: ['./info-control.component.css'],
})

export class InfoControlComponent implements OnInit {
  private apiUrl = `${BASE_URL}/tramite`;
  tramite: EditarTramiteDTO = new EditarTramiteDTO();
  tramiteId: number;
  datosOriginales: any;

  constructor(
    private route: ActivatedRoute,
    private tramiteService: TramiteRegulatorioService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tramiteId = +params['id'];
      this.cargarTramite();
    });
  }

  cargarTramite() {
    this.tramiteService.getTramite(this.tramiteId).subscribe({
      next: (data) => {
        this.tramite = EditarTramiteDTO.fromJSON(data);
        this.datosOriginales = { ...data };
        
      },
      error: (error) => {
        console.error('Error al cargar el trámite:', error);
      }
  });
  }

   


 

guardarCambios() {

  const cambios = this.identificarCambios();
  
  console.log('Guardando cambios:', this.tramite);
  this.tramiteService.actualizarTramite(this.tramiteId, this.tramite).subscribe({

    next: (response) => {
      console.log('Respuesta exitosa:', response);
      localStorage.setItem('cambiosTramite', JSON.stringify(cambios));
      this.tramite = EditarTramiteDTO.fromJSON(response);
      alert('Cambios guardados exitosamente'); 
      this.router.navigate(['/asuntos-regulatorios/info-solicitud']);
    },
    
  });
}

private identificarCambios(): any {
  const cambios: any = {};
  Object.keys(this.tramite).forEach(key => {
    const valorOriginal = this.datosOriginales[key];
    const valorNuevo = (this.tramite as any)[key];
    
    if (valorOriginal !== valorNuevo && valorNuevo !== undefined) {
      cambios[key] = {
        anterior: valorOriginal,
        nuevo: valorNuevo
      };
    }
  });
  return cambios;

} 

}