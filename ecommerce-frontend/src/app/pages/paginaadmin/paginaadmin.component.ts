import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-paginaadmin',
  imports: [],
  templateUrl: './paginaadmin.component.html',
  styleUrl: './paginaadmin.component.css'
})
export class PaginaadminComponent {

  constructor(private router: Router) {}

  onHomeIconClick() {
    this.router.navigate(["/inicio"]);
  }

  onUserIconClick() {
    this.router.navigate(["/"]);
  }

  onShoppingCartIconClick() {
    this.router.navigate(["/carrito"]);
  }
}


