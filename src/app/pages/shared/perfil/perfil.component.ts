import { Usuario } from '@/app/modelos/usuario';
import { UsuarioDTO } from '@/app/modelos/usuarioDTO';
import { AuthService } from '@/app/servicios/auth.service';
import { UsuarioService } from '@/app/servicios/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Input, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  @Input()
  usuarioDTO: UsuarioDTO = {
    nombre: '',
    rol: { id: 0, tipoRol: '' },
    correoElectronico: ''
  };

  nomUsuario: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(): void {
    this.nomUsuario = localStorage.getItem('username');
    console.log(this.nomUsuario);
    console.log("ENTRA A GETDATA");
    this.usuarioService.findByUsername(this.nomUsuario).subscribe(
      (data: Usuario) => {
        this.usuarioDTO = data;
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        if (error.status === 401) {
          console.error('No autorizado. Verifique su token de autenticación.');
        }
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  home(): void {
    if (this.authService.role === 'SOLICITANTE') {
      this.router.navigate(['/tabla-tramite']);
    } else if (this.authService.role === 'ASUNTOSREG') {
      this.router.navigate(['/solicitudes']);
    } else if (this.authService.role === 'ADMIN') {
      this.router.navigate(['/estadisticas']);
    }
  }
}
