import { Component, OnInit, inject } from '@angular/core';
import { LibrosService, Libro } from '../servicios/libros.service';

@Component({
  selector: 'app-libros-disponibles',
  standalone: true,
  template: `
    <h2>Libros Disponibles</h2>
    
    <div>
      <h3>Libros disponibles para préstamo ({{librosDisponibles.length}}):</h3>
      @if (librosDisponibles.length > 0) {
        <ul>
          @for (libro of librosDisponibles; track libro.id) {
            <li>
              {{libro.titulo}} - {{libro.autor}} 
              ({{libro.categoria}} - {{libro.anio}}) 
              Código: {{libro.codigoInventario}}
            </li>
          }
        </ul>
      } @else {
        <p>No hay libros disponibles en este momento</p>
      }
    </div>
  `
})
export class LibrosDisponiblesComponent implements OnInit {
  librosDisponibles: Libro[] = [];
  
  private librosService = inject(LibrosService);

  async ngOnInit() {
    this.librosDisponibles = await this.librosService.getLibrosDisponibles();
  }
}