import { Injectable } from '@angular/core';

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
  private usuarios: Usuario[] = [];

  getUsuarios(): Usuario[] {
    return [...this.usuarios];
  }

  agregarUsuario(nombre: string, documento: string, contacto: string): Usuario {
    const usuarioExistente = this.usuarios.find(u => u.documento === documento);
    if (usuarioExistente) {
      throw new Error('Usuario ya existente con ese CI: ' + documento);
    }

    const nuevoUsuario: Usuario = {
      id: this.usuarios.length + 1,
      nombre,
      documento,
      contacto
    };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }
}
