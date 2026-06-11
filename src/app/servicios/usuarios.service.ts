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

  async actualizarUsuario(usuarioId: number, datosFormulario: { telefono?: string, correo?: string }): Promise<string | null> {
    // Ahora la funcion tiene la val. basica para el tdd (Version refactor.) aqui ya se valida con el trim y se tipea los parametros a recibir
    if (!datosFormulario.correo || datosFormulario.correo.trim() === '') {
      return 'No se puede: el correo es obligatorio...';
    }
    return null;
  }
}