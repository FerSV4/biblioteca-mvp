import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService, Libro } from '../servicios/libros.service';

@Component({
  selector: 'app-buscar-libros',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Búsqueda de Libros</h2>
    
    <div>
      <input [(ngModel)]="terminoBusqueda" placeholder="Buscar por título, autor o categoría" (keyup.enter)="buscar()">
      <button (click)="buscar()">Buscar</button>
      <button (click)="limpiar()">Limpiar</button>
    </div>

    <div>
      @if (librosEncontrados.length > 0) {
        <h3>Resultados encontrados ({{librosEncontrados.length}}):</h3>
        <ul>
          @for (libro of librosEncontrados; track libro.id) {
            <li>
              {{libro.titulo}} - {{libro.autor}} ({{libro.categoria}}) 
              - {{libro.anio}} - Código: {{libro.codigoInventario}}
              - {{libro.disponible ? 'Disponible' : 'Prestado'}}
            </li>
          }
        </ul>
      } @else {
        <p>No se encontraron resultados</p>
      }
    </div>
  `
})
export class BuscarLibrosComponent {
  todosLibros: Libro[] = [];
  librosEncontrados: Libro[] = [];
  terminoBusqueda = '';

  constructor(private librosService: LibrosService) {
    this.todosLibros = this.librosService.getLibros();
    this.librosEncontrados = this.todosLibros;
  }

  buscar() {
    this.librosEncontrados = this.librosService.buscarLibros(this.terminoBusqueda);
  }

  limpiar() {
    this.terminoBusqueda = '';
    this.librosEncontrados = this.todosLibros;
  }
}
