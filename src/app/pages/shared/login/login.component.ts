import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  loading = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.username || !this.password) {
      alert('Por favor, ingrese su usuario y contraseña');
      return;
    }
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        this.loading = false;
        if (data === 'SOLICITANTE')
          return this.router.navigate(['/tabla-tramite']);
        if (data === 'ADMIN') return this.router.navigate(['/admin/estadisticas']);
        if (data === 'ASUNTOSREG')
          return this.router.navigate(['/solicitudes']);
      },
      (error) => {
        this.loading = false;
        alert('Usuario o contraseña incorrectos');
      }
    );
  }
}
