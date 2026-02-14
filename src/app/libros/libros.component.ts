import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService, Libro } from '../servicios/libros.service';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Registro de Libros</h2>
    
    <div>
      <input [(ngModel)]="nuevoTitulo" placeholder="Título">
      <input [(ngModel)]="nuevoAutor" placeholder="Autor">
      <input [(ngModel)]="nuevoAnio" type="number" placeholder="Año">
      <input [(ngModel)]="nuevaCategoria" placeholder="Categoría">
      <input [(ngModel)]="nuevoCodigo" placeholder="Código de inventario">
      <button (click)="registrarLibro()">Registrar Libro</button>
    </div>

    <div>
      @if (mensajeError) {
        <p style="color: red;">{{mensajeError}}</p>
      }
      @if (mensajeExito) {
        <p style="color: green;">Libro registrado: {{mensajeExito}}</p>
      }
    </div>
  `
})
export class LibrosComponent {
  nuevoTitulo = '';
  nuevoAutor = '';
  nuevoAnio = '';
  nuevaCategoria = '';
  nuevoCodigo = '';
  mensajeError = '';
  mensajeExito = '';

  constructor(private librosService: LibrosService) {}

  registrarLibro() {
    this.mensajeError = '';
    this.mensajeExito = '';

    try {
      const anioNum = parseInt(this.nuevoAnio);
      if (!this.nuevoTitulo || !this.nuevoAutor || !this.nuevoAnio || !this.nuevaCategoria || !this.nuevoCodigo) {
        throw new Error('Todos los campos son obligatorios');
      }

      const libro = this.librosService.agregarLibro(
        this.nuevoTitulo.trim(),
        this.nuevoAutor.trim(),
        anioNum,
        this.nuevaCategoria.trim(),
        this.nuevoCodigo.trim()
      );
      this.mensajeExito = `${libro.titulo} - Código: ${libro.codigoInventario}`;
      this.nuevoTitulo = '';
      this.nuevoAutor = '';
      this.nuevoAnio = '';
      this.nuevaCategoria = '';
      this.nuevoCodigo = '';
    } catch (error: any) {
      this.mensajeError = error.message;
    }
  }
}
