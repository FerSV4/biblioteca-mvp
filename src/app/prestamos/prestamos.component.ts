import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UsuariosService, Usuario } from '../servicios/usuarios.service';
import { LibrosService, Libro } from '../servicios/libros.service';
import { PrestamosService, Prestamo } from '../servicios/prestamos.service';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [FormsModule, DatePipe],
  template: `
    <h2>Gestion de Prestamos</h2>

    <div>
      <h3>Realizar Nuevo Prestamo</h3>
      <div>
        <select [(ngModel)]="usuarioSeleccionado">
          <option value="0">Seleccionar usuario</option>
          @for (usuario of usuarios; track usuario.id) {
            <option [value]="usuario.id">{{usuario.nombre}}</option>
          }
        </select>

        <select [(ngModel)]="libroSeleccionado">
          <option value="0">Seleccionar libro disponible</option>
          @for (libro of librosDisponibles; track libro.id) {
            <option [value]="libro.id">{{libro.titulo}}</option>
          }
        </select>

        <button (click)="realizarPrestamo()" [disabled]="!puedePrestar()">
          Realizar Prestamo
        </button>
      </div>
    </div>

    <div>
      <h3>Prestamos Activos ({{prestamos.length}})</h3>
      @if (prestamos.length > 0) {
        <ul>
          @for (p of prestamos; track p.id) {
            <li>
              Usuario: {{p.usuarios?.nombre}} | 
              Libro: {{p.libros?.titulo}} | 
              Prestado: {{p.fechaPrestamo | date:'shortDate'}} | 
              Devolucion: {{p.fechaDevolucion | date:'shortDate'}}
            </li>
          }
        </ul>
      } @else {
        <p>No hay prestamos activos</p>
      }
    </div>
  `
})
export class PrestamosComponent implements OnInit {
  usuarios: Usuario[] = [];
  librosDisponibles: Libro[] = [];
  prestamos: Prestamo[] = [];
  usuarioSeleccionado = 0;
  libroSeleccionado = 0;

  private usuariosService = inject(UsuariosService);
  private librosService = inject(LibrosService);
  private prestamosService = inject(PrestamosService);

  ngOnInit() {
    this.refrescarDatos();
  }

  async refrescarDatos() {
    this.usuarios = await this.usuariosService.getUsuarios();
    this.librosDisponibles = await this.librosService.getLibrosDisponibles();
    this.prestamos = await this.prestamosService.getPrestamos();
  }

  puedePrestar(): boolean {
    return this.usuarioSeleccionado > 0 && this.libroSeleccionado > 0;
  }

  async realizarPrestamo() {
    const error = await this.prestamosService.realizarPrestamo(
      this.usuarioSeleccionado,
      this.libroSeleccionado
    );

    if (error) {
      alert(error);
    } else {
      alert('Prestamo registrado de forma correcta.');
      this.usuarioSeleccionado = 0;
      this.libroSeleccionado = 0;
      this.refrescarDatos();
    }
  }
}