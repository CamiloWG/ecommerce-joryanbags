import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { ProductListService } from "../../../services/product-list.service";
import { Product } from "../../../interfaces/product.interface";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
@Component({
  selector: 'header-menu',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent {
  @HostBinding("style.display") display = "contents";
  searchQuery: string = '';  // La propiedad que guarda lo que el usuario escribe en la barra
  searchResults: Product[] = [];  // Los resultados de la búsqueda filtrados
  products: Product[] = [];  // Todos los productos disponibles para buscar


  constructor(private router: Router, private authService: AuthService,private productService: ProductListService ) {}

  onHomeIconClick() {
    this.router.navigate(["/"]);
  }

  onUserIconClick() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/usuario']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onShoppingCartIconClick() {
    this.router.navigate(['/carrito']);
  }
  ngOnInit(): void {
    // Obtener los productos desde el servicio
    this.productService.GetProducts().subscribe((products: Product[]) => {
      this.products = products;  // Guardamos los productos en la lista
    });
  }

  onSearchChange(): void {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];  // Si no hay búsqueda, no mostramos resultados
      return;
    }

    // Filtramos los productos que contienen la cadena de búsqueda en el nombre
    this.searchResults = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
  selectProduct(product: Product): void {
    console.log('Producto seleccionado:', product);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['producto', product.product_id]);
    });  
  }  
}
