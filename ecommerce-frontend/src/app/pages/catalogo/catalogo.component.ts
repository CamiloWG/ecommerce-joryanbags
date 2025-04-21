import { Component, HostListener, Input } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { CategoriasComponent } from "../../core/components/categorias/categorias.component";
import { ProductInfoCard } from '../../core/components/ProductInfoCard/ProductInfoCard.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { ProductListService } from '../../core/services/product-list.service';
import { Product } from '../../core/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { CatalogFilterComponent } from '../../core/components/catalog-filter/catalog-filter.component';
import { MatChipsModule } from '@angular/material/chips';
import { ProductFilters } from '../../core/interfaces/filter.interfaces';

@Component({
  selector: 'app-catalogo',
  imports: [HeaderMenuComponent, 
    Route, 
    LogoComponent, 
    CategoriasComponent,
    CatalogFilterComponent,
    MatChipsModule,
    ProductInfoCard,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  products: Product[] = [];
  skeletonArray = Array(12).fill(0);
  
  isLoading = false;  
  page = 1;
  limit = 12;
  totalPages = 0;

  private filters: ProductFilters = {} as ProductFilters;
  private sortQuery: string = 'new';

  constructor(private productService: ProductListService) {}

  ngOnInit(): void {    
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.getProductCount(this.filters).subscribe(count => {
      this.totalPages = Math.ceil(count / this.limit);
    });
    this.productService.GetProductsPaginated(this.page, this.limit, this.filters, this.sortQuery).subscribe(products => {
      this.products = products;
      this.isLoading = false;
    });

  }

  onFilterChange(filtros: ProductFilters) {
    this.filters = filtros;
    this.fetchProducts();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchProducts();
    }
  }

  orden = ['Nuevo', 'Precio ascendente', 'Precio descendente'];
  ordenSeleccionado: string = 'Nuevo';

  seleccionarFiltro(filtro: string) {
    this.ordenSeleccionado = filtro;
    if(filtro === 'Precio ascendente') {
      this.sortQuery = 'price_asc';
    } else if(filtro === 'Precio descendente') {
      this.sortQuery = 'price_desc';
    } else {
      this.sortQuery = 'new';
    }
    this.fetchProducts();
  }
  
  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchProducts();
    }
  }
}
