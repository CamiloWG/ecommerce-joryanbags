import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { CategoriasComponent } from '../../core/components/categorias/categorias.component';
import { Portada } from '../../core/components/portada/portada.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderMenuComponent,
    CategoriasComponent,
    Portada
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
