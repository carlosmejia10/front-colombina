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

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe((data) => {
      if (data === 'SOLICITANTE')
        return this.router.navigate(['/tabla-tramite']);
      if (data === 'ADMIN')
        return this.router.navigate(['/estadisticas']);
      if (data === 'ASUNTOSREG')
        return this.router.navigate(['/solicitudes']);
    })
  }
}
