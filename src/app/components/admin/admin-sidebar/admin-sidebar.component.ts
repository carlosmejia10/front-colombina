import { Usuario } from '@/app/modelos/usuario';
import { UsuarioDTO } from '@/app/modelos/usuarioDTO';
import { UsuarioService } from '@/app/servicios/usuario.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  @Input()
  usuarioDTO: UsuarioDTO = {
    nombre: '',
    rol: { id: 0, tipoRol: '' },
    correoElectronico: ''
  };

  nomUsuario: string;

  constructor(
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(): void {
    this.nomUsuario = localStorage.getItem('username');
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
