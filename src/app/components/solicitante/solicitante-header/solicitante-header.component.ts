import { AuthService } from '@/app/servicios/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitante-header',
  templateUrl: './solicitante-header.component.html',
  styleUrl: './solicitante-header.component.css',
})
export class SolicitanteHeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
