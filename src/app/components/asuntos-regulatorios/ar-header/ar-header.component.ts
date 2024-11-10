import { AuthService } from '@/app/servicios/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ar-header',
  templateUrl: './ar-header.component.html',
  styleUrl: './ar-header.component.css'
})
export class ArHeaderComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
