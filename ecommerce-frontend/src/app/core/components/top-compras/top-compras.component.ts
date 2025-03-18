import { Component } from '@angular/core';
import { MenuItem } from '../shared/MenuItem/MenuItem.component';
import { MenuSeparator } from '../shared/MenuSeparator/MenuSeparator.component';

@Component({
  selector: 'top-compras',
  imports: [MenuItem, MenuSeparator],
  templateUrl: './top-compras.component.html',
  styleUrl: './top-compras.component.css'
})
export class TopComprasComponent {

}
