import { Usuario } from '@/app/modelos/usuario';
import { UsuarioDTO } from '@/app/modelos/usuarioDTO';
import { UsuarioService } from '@/app/servicios/usuario.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ar-sidebar',
  templateUrl: './ar-sidebar.component.html',
  styleUrl: './ar-sidebar.component.css'
})
export class ArSidebarComponent {
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

