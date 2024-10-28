import { Usuario } from '@/app/modelos/usuario';
import { UsuarioDTO } from '@/app/modelos/usuarioDTO';
import { AuthService } from '@/app/servicios/auth.service';
import { UsuarioService } from '@/app/servicios/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  @Input()
  usuarioDTO: UsuarioDTO = {
    nombre: 'Nombre de Usuario',
    rol: { id: 0, tipoRol: 'Rol Asignado' },
    correoElectronico: 'correo@example.com'
  };

  nomUsuario: string;

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private usuarioService: UsuarioService) {}

    ngOnInit(): void {
      this.getDatos();
    }

    getDatos():void {
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
    
}
