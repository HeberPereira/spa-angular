import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarios: Usuario[] = [];

  constructor() {}

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  adicionarUsuario(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }
}
