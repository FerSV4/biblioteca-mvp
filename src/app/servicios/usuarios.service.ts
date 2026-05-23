import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface Usuario {
  id: number;
  nombre: string;
  documento: string;
  contacto: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private supabase: SupabaseService) {}

  async getUsuarios(): Promise<Usuario[]> {
    const { data, error } = await this.supabase.supabase.from('usuarios').select('*');
    if (error) throw error;
    return data as Usuario[];
  }

  async agregarUsuario(nombre: string, documento: string, contacto: string): Promise<Usuario> {
    const { data, error } = await this.supabase.supabase
      .from('usuarios')
      .insert([{ nombre, documento, contacto }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') throw new Error('Usuario ya existente con ese CI: ' + documento);
      throw error;
    }
    return data as Usuario;
  }
}