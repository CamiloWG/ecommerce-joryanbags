import { Component } from '@angular/core';
import { MenuItem } from '../shared/MenuItem/MenuItem.component';
import { MenuSeparator } from '../shared/MenuSeparator/MenuSeparator.component';
import { ProductListService } from '../../services/product-list.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'top-compras',
  imports: [MenuItem, MenuSeparator],
  templateUrl: './top-compras.component.html',
  styleUrl: './top-compras.component.css'
})
export class TopComprasComponent {

  topProducts: Product[] = [];
  
  constructor(private productService: ProductListService) {
    productService.GetTopProducts().subscribe(result => {
      this.topProducts = result;
      this.topProducts.splice(3);      
    })
  }
}
