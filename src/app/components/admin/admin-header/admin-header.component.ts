import { AuthService } from '@/app/servicios/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  logout() {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
