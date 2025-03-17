import { Component } from '@angular/core';
import { MenuItem } from '../shared/MenuItem/MenuItem.component';
import { MenuSeparator } from '../shared/MenuSeparator/MenuSeparator.component';

@Component({
  selector: 'menu-categorias',
  imports: [MenuItem, MenuSeparator],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

}
