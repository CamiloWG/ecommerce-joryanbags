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

  constructor(private productService: ProductListService) {}

  ngOnInit(): void {
    this.productService.getProductCount().subscribe(count => {
      this.totalPages = Math.ceil(count / this.limit);
    });
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.GetProductsPaginated(this.page, this.limit).subscribe(products => {
      this.products = products;
      this.isLoading = false;
    });

  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchProducts();
    }
  }

  filtros = ['Nuevo', 'Precio ascendente', 'Precio descendente'];
  filtroSeleccionado: string = 'Nuevo';

  seleccionarFiltro(filtro: string) {
    this.filtroSeleccionado = filtro;
    // Aquí puedes agregar tu lógica de ordenamiento según el filtro
    console.log('Filtro seleccionado:', filtro);
  }
  
  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchProducts();
    }
  }
}
