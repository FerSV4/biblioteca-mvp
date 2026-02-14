import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LibrosComponent } from './libros/libros.component';
import { BuscarLibrosComponent } from './buscar-libros/buscar-libros.component';
import { LibrosDisponiblesComponent } from './libros-disponibles/libros-disponibles.component';
import { PrestamosComponent } from './prestamos/prestamos.component';


export const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'buscar', component: BuscarLibrosComponent },
  { path: 'prestamos', component: PrestamosComponent },
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: '**', redirectTo: '/usuarios' }
];
