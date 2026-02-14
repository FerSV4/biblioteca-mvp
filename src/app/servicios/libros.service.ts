import { Injectable } from '@angular/core';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio: number;
  categoria: string;
  codigoInventario: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private libros: Libro[] = [
    { id: 1, titulo: 'Arquitectura limpia', autor: 'Daniel Quino', anio: 2008, categoria: 'Ingenieria de Software', codigoInventario: 'INV-001', cantidad: 2 },
    { id: 2, titulo: 'Angular', autor: 'Alguien', anio: 2018, categoria: 'Desarrollo Web', codigoInventario: 'INV-002', cantidad: 1 },
    { id: 3, titulo: 'React', autor: 'Alguien 2', anio: 2010, categoria: 'Programacion', codigoInventario: 'INV-003', cantidad: 2 },
    { id: 4, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anio: 1605, categoria: 'Literatura', codigoInventario: 'INV-004', cantidad: 1 },
    { id: 5, titulo: 'Vanilla JS', autor: 'JJ', anio: 2025, categoria: 'App web', codigoInventario: 'INV-005', cantidad: 2 }
  ];

  getLibros(): Libro[] {
    return [...this.libros];
  }

  getLibrosDisponibles(): Libro[] {
    return this.libros.filter(l => l.cantidad > 0);
  }

  agregarLibro(titulo: string, autor: string, anio: number, categoria: string, codigoInventario: string, cantidad: number): Libro {
    const existe = this.libros.find(l => l.codigoInventario === codigoInventario);
    if (existe) {
      throw new Error('Este codigo ya existe, ingrese otro');
    }

    const nuevoLibro: Libro = {
      id: this.libros.length + 1,
      titulo,
      autor,
      anio,
      categoria,
      codigoInventario,
      cantidad
    };
    this.libros.push(nuevoLibro);
    return nuevoLibro;
  }

  buscarLibros(termino: string): Libro[] {
    if (!termino.trim()) {
      return this.getLibros();
    }
    const search = termino.toLowerCase();
    return this.libros.filter(l =>
      l.titulo.toLowerCase().includes(search) ||
      l.autor.toLowerCase().includes(search) ||
      l.categoria.toLowerCase().includes(search)
    );
  }

  prestarLibro(id: number): void {
    const libro = this.libros.find(l => l.id === id);
    if (libro && libro.cantidad > 0) {
      libro.cantidad--;
    }
  }
}
