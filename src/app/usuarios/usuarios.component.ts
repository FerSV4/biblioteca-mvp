import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService, Usuario } from '../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Registro de Usuarios</h2>
    
    <div>
      <input [(ngModel)]="nuevoNombre" placeholder="Nombre completo" required>
      <input [(ngModel)]="nuevoDocumento" placeholder="Documento" required>
      <input [(ngModel)]="nuevoContacto" placeholder="Contacto (tel/email)">
      <button (click)="registrarUsuario()">Registrar Usuario</button>
    </div>

    <div>
      <h3>Usuarios Registrados</h3>
      @if (usuarios.length > 0) {
        <ul>
          @for (usuario of usuarios; track usuario.id) {
            <li>ID: {{usuario.id}} - {{usuario.nombre}} - {{usuario.documento}} - {{usuario.contacto}}</li>
          }
        </ul>
      }
      @if (mensajeError) {
        <p style="color: red;">{{mensajeError}}</p>
      }
    </div>
  `
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  nuevoNombre = '';
  nuevoDocumento = '';
  nuevoContacto = '';
  mensajeError = '';

  constructor(private usuariosService: UsuariosService) {}

  async ngOnInit() {
    this.usuarios = await this.usuariosService.getUsuarios();
  }

  async registrarUsuario() {
    this.mensajeError = '';
    
    try {
      await this.usuariosService.agregarUsuario(
        this.nuevoNombre.trim(),
        this.nuevoDocumento.trim(),
        this.nuevoContacto.trim()
      );
      this.usuarios = await this.usuariosService.getUsuarios();
      this.nuevoNombre = '';
      this.nuevoDocumento = '';
      this.nuevoContacto = '';
    } catch (error: any) {
      this.mensajeError = error.message;
    }
  }
}