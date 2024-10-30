import {Component} from "@angular/core";
import {Router} from "@angular/router";


@Component({
  selector: 'app-info-control',
  templateUrl: './info-control.component.html',
  styleUrls: ['./info-control.component.css'],
})
export class InfoControlComponent {
  constructor(private router: Router) {}

  submit() {
    // Aquí podrías manejar la lógica del formulario
    alert('Formulario enviado correctamente.');
    this.router.navigate(['/documentos']);
  }
}
