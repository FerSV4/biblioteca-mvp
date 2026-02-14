import { Injectable } from '@angular/core';
import { UsuariosService, Usuario } from './usuarios.service';
import { LibrosService, Libro } from './libros.service';

export interface Prestamo {
  id: number;
  usuario: Usuario;
  libro: Libro;
  fechaPrestamo: Date;
  fechaDevolucion: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  private prestamos: Prestamo[] = [];
  private LIMITE_PRESTAMOS = 3;

  constructor(
    private usuariosService: UsuariosService,
    private librosService: LibrosService
  ) {}

  getPrestamos(): Prestamo[] {
    return [...this.prestamos];
  }

  realizarPrestamo(uId: number, lId: number): string | null {
    const userId = Number(uId);
    const libroId = Number(lId);

    const usuario = this.usuariosService.getUsuarios().find(u => u.id === userId);
    const libro = this.librosService.getLibros().find(l => l.id === libroId);

    if (!usuario || !libro || !libro.disponible) {
      return 'Error: Usuario o libro no valido';
    }

    const prestamosActivos = this.prestamos.filter(p => p.usuario.id === userId).length;
    if (prestamosActivos >= this.LIMITE_PRESTAMOS) {
      return 'Rechazado: El usuario supero el limite de 3 prestamos';
    }

    const hoy = new Date();
    const devolucion = new Date();
    devolucion.setDate(hoy.getDate() + 14);

    const nuevoPrestamo: Prestamo = {
      id: this.prestamos.length + 1,
      usuario,
      libro,
      fechaPrestamo: hoy,
      fechaDevolucion: devolucion
    };

    this.prestamos.push(nuevoPrestamo);
    this.librosService.prestarLibro(libroId);
    return null;
  }
}
