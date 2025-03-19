import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { CategoriasComponent } from "../../core/components/categorias/categorias.component";
import { TagToggleGroup } from '../../core/components/TagToggleGroup/TagToggleGroup.component';

@Component({
  selector: 'app-catalogo',
  imports: [HeaderMenuComponent, 
    Route, 
    LogoComponent, 
    CategoriasComponent,
    TagToggleGroup
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

}
