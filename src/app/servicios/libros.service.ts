import { Injectable } from '@angular/core';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio: number;
  categoria: string;
  codigoInventario: string;
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private libros: Libro[] = [
    { id: 1, titulo: 'Arquitectura limpia', autor: 'Daniel Quino', anio: 2008, categoria: 'Ingenieria de Software', codigoInventario: 'INV-001', disponible: true },
    { id: 2, titulo: 'Angular', autor: 'Alguien', anio: 2018, categoria: 'Desarrollo Web', codigoInventario: 'INV-002', disponible: true },
    { id: 3, titulo: 'React', autor: 'Alguien 2', anio: 2010, categoria: 'Programacion', codigoInventario: 'INV-003', disponible: true },
    { id: 4, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anio: 1605, categoria: 'Literatura', codigoInventario: 'INV-004', disponible: true },
    { id: 5, titulo: 'Vanilla JS', autor: 'JJ', anio: 2025, categoria: 'App web', codigoInventario: 'INV-005', disponible: true }
  ];

  getLibros(): Libro[] {
    return [...this.libros];
  }

  getLibrosDisponibles(): Libro[] {
    return this.libros.filter(libro => libro.disponible);
  }

  agregarLibro(titulo: string, autor: string, anio: number, categoria: string, codigoInventario: string): Libro {
    const libroExistente = this.libros.find(l => l.codigoInventario === codigoInventario);
    if (libroExistente) {
      throw new Error('Codigo de inventario ya existe: ' + codigoInventario);
    }

    const nuevoLibro: Libro = {
      id: this.libros.length + 1,
      titulo,
      autor,
      anio,
      categoria,
      codigoInventario,
      disponible: true
    };
    this.libros.push(nuevoLibro);
    return nuevoLibro;
  }

  buscarLibros(termino: string): Libro[] {
    if (!termino.trim()) {
      return this.getLibros();
    }
    const lowerTermino = termino.toLowerCase();
    return this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(lowerTermino) ||
      libro.autor.toLowerCase().includes(lowerTermino) ||
      libro.categoria.toLowerCase().includes(lowerTermino)
    );
  }

  prestarLibro(id: number): void {
    const libro = this.libros.find(l => l.id === id);
    if (libro) {
      libro.disponible = false;
    }
  }
}
