import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/usuarios">Usuarios</a>
      <a routerLink="/libros">Registrar Libros</a>
      <a routerLink="/buscar">Buscar Libros</a>
      <a routerLink="/prestamos">Prestamos</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav { padding: 1rem; background: #f5f5f5; border-bottom: 1px solid #ddd; }
    nav a { margin-right: 1rem; text-decoration: none; color: #333; }
    nav a:hover { text-decoration: underline; }
  `]
})
export class AppComponent {}
