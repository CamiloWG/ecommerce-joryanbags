import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { CategoriasComponent } from '../../core/components/categorias/categorias.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { ProductComponent } from '../../core/components/product/product.component';
import { ProductcardComponent } from '../../core/components/productcard/productcard.component';

@Component({
  selector: 'app-producto',
  imports: [ HeaderMenuComponent,
    Route,
    LogoComponent,
    CategoriasComponent,
    ProductComponent,
    ProductcardComponent,
    FooterComponent
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

}
