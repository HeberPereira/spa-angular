import { Component } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  novoUsuario: Usuario = { id: 0, nome: '', email: '' };

  constructor(private usuarioService: UsuarioService) {}

  adicionarUsuario(): void {
    this.usuarioService.adicionarUsuario(this.novoUsuario);
    this.novoUsuario = { id: 0, nome: '', email: '' };
  }

  get usuarios(): Usuario[] {
    return this.usuarioService.getUsuarios();
  }
}
