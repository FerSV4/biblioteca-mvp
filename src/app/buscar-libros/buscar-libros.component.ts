import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibrosService, Libro } from '../servicios/libros.service';

@Component({
  selector: 'app-buscar-libros',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Busqueda de Libros</h2>
    
    <div>
      <input [(ngModel)]="terminoBusqueda" placeholder="Buscar por titulo, autor o categoria" (keyup.enter)="buscar()">
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
              - {{libro.anio}} - Codigo: {{libro.codigoInventario}}
              - {{libro.cantidad > 0 ? 'Disponible' : 'Prestado (Sin stock)'}}
              - Ejemplares: {{libro.cantidad}}
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
  librosEncontrados: Libro[] = [];
  terminoBusqueda = '';

  constructor(private librosService: LibrosService) {
    this.refrescar();
  }


  //   private librosService = inject(LibrosService);

  async refrescar() {
    this.librosEncontrados = await this.librosService.getLibros();
  }

  async buscar() {
    this.librosEncontrados = await this.librosService.buscarLibros(this.terminoBusqueda);
  }

  limpiar() {
    this.terminoBusqueda = '';
    this.refrescar();
  }
}