import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Usuario } from './usuarios.service';
import { Libro } from './libros.service';

export interface Prestamo {
  id: number;
  usuarioId: number;
  libroId: number;
  fechaPrestamo: Date;
  fechaDevolucion: Date;
  usuarios?: Usuario;
  libros?: Libro;
}

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  private LIMITE_PRESTAMOS = 3;

  constructor(private supabase: SupabaseService) {}

  async getPrestamos(): Promise<Prestamo[]> {
    const { data, error } = await this.supabase.supabase
      .from('prestamos')
      .select('*, usuarios(*), libros(*)');
      
    if (error) throw error;
    return data as Prestamo[];
  }

  async realizarPrestamo(uId: number, lId: number): Promise<string | null> {
    // 1. Verificar libro
    const { data: libro } = await this.supabase.supabase.from('libros').select('*').eq('id', lId).single();
    if (!libro || libro.cantidad <= 0) return 'Error: Libro no válido o sin ejemplares';

    // 2. Verificar límite de préstamos del usuario
    const { count } = await this.supabase.supabase
      .from('prestamos')
      .select('*', { count: 'exact', head: true })
      .eq('usuarioId', uId);

    if (count !== null && count >= this.LIMITE_PRESTAMOS) {
      return 'Rechazado: El usuario superó el límite de 3 préstamos';
    }

    const hoy = new Date();
    const devolucion = new Date();
    devolucion.setDate(hoy.getDate() + 14);

    const { error: insertError } = await this.supabase.supabase.from('prestamos').insert([{
      usuarioId: uId,
      libroId: lId,
      fechaPrestamo: hoy.toISOString(),
      fechaDevolucion: devolucion.toISOString()
    }]);

    if (insertError) return 'Error al registrar el préstamo';

    await this.supabase.supabase
      .from('libros')
      .update({ cantidad: libro.cantidad - 1 })
      .eq('id', lId);

    return null;
  }
  
  //Esta ya es la renovacion del prestamo, ya refactor...--
  async renovarPrestamo(prestamoId: number): Promise<string | null> {
    //Aqui ya se busca el prestamo de vrd (El cambio es minimo, solo fue especificar lo que se tenia que buscar de la db)
    const { data: prestamoEspecifico } = await this.supabase.supabase
      .from('prestamos')
      .select('id, fechaDevolucion')
      .eq('id', prestamoId)
      .single();

    if (!prestamoEspecifico) {
      return 'El prestamo no existe...';
    }

    return null;
  }

  async registrarDevolucion(prestamoId: number, estadoActual: string): Promise<string | null> {
    // ahora ya no esta vacio, se verifica el estado de devuelto.
    if (estadoActual === 'Devuelto') {
      return 'No se puede: el libro ya esta marcado como devuelto';
    }
    
    return null;
  }
}