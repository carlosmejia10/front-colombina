import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí puedes agregar la lógica de autenticación
    // Si la autenticación es exitosa, redirige a la página de tabla-tramite
    this.router.navigate(['/tabla-tramite']);
  }
}
