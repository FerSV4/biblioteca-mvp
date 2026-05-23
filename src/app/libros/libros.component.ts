import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../servicios/libros.service';

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
      <input [(ngModel)]="nuevaCantidad" type="number" placeholder="Ejemplares">
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
  nuevaCantidad = '';
  mensajeError = '';
  mensajeExito = '';

  private librosService = inject(LibrosService);

  async registrarLibro() {
    this.mensajeError = '';
    this.mensajeExito = '';

    try {
      const anioNum = parseInt(this.nuevoAnio);
      const cantNum = parseInt(this.nuevaCantidad);

      if (!this.nuevoTitulo || !this.nuevoAutor || !this.nuevoAnio || !this.nuevaCategoria || !this.nuevoCodigo || !this.nuevaCantidad) {
        throw new Error('Todos los campos son obligatorios');
      }

      if (cantNum < 1 || cantNum > 2) {
        throw new Error('La cantidad debe ser 1 o 2 ejemplares');
      }

      const libro = await this.librosService.agregarLibro(
        this.nuevoTitulo.trim(),
        this.nuevoAutor.trim(),
        anioNum,
        this.nuevaCategoria.trim(),
        this.nuevoCodigo.trim(),
        cantNum
      );

      this.mensajeExito = `${libro.titulo} (${libro.cantidad} copias)`;
      this.nuevoTitulo = '';
      this.nuevoAutor = '';
      this.nuevoAnio = '';
      this.nuevaCategoria = '';
      this.nuevoCodigo = '';
      this.nuevaCantidad = '';
    } catch (e) {
      const error = e as Error;
      this.mensajeError = error.message;
    }
  }
}