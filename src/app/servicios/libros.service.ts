import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

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
  constructor(private supabase: SupabaseService) {}

  async getLibros(): Promise<Libro[]> {
    const { data, error } = await this.supabase.supabase.from('libros').select('*');
    if (error) throw error;
    return data as Libro[];
  }

  async getLibrosDisponibles(): Promise<Libro[]> {
    const { data, error } = await this.supabase.supabase.from('libros').select('*').gt('cantidad', 0);
    if (error) throw error;
    return data as Libro[];
  }

  async agregarLibro(titulo: string, autor: string, anio: number, categoria: string, codigoInventario: string, cantidad: number): Promise<Libro> {
    const { data, error } = await this.supabase.supabase
      .from('libros')
      .insert([{ titulo, autor, anio, categoria, codigoInventario, cantidad }])
      .select()
      .single();

    if (error) {
       if (error.code === '23505') throw new Error('Este codigo ya existe, ingrese otro');
       throw error;
    }
    return data as Libro;
  }

  async buscarLibros(termino: string): Promise<Libro[]> {
    if (!termino.trim()) return this.getLibros();
    
    const search = `%${termino}%`;
    const { data, error } = await this.supabase.supabase
      .from('libros')
      .select('*')
      .or(`titulo.ilike.${search},autor.ilike.${search},categoria.ilike.${search}`);
      
    if (error) throw error;
    return data as Libro[];
  }
}