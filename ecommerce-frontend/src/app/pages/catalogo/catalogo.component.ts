import { Component, Input } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { CategoriasComponent } from "../../core/components/categorias/categorias.component";
import { TagToggleGroup } from '../../core/components/TagToggleGroup/TagToggleGroup.component';
import { ProductInfoCard } from '../../core/components/ProductInfoCard/ProductInfoCard.component';
import { CatalogFilterComponent } from '../../core/components/CatalogFilter/CatalogFilter.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { ProductListService } from '../../core/services/product-list.service';
import { Product } from '../../core/interfaces/product.interface';

@Component({
  selector: 'app-catalogo',
  imports: [HeaderMenuComponent, 
    Route, 
    LogoComponent, 
    CategoriasComponent,
    TagToggleGroup,
    ProductInfoCard,
    CatalogFilterComponent,
    FooterComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  products: Product[] = []

  constructor(private ProductService: ProductListService) {
    ProductService.GetProducts().subscribe(data => {
      this.products = data;
    });
  }

}
