import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { Route } from '../../core/components/shared/Route/Route.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { PedidoComponent } from '../../core/components/pedido/pedido.component';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/interfaces/user.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/interfaces/order.interface';

@Component({
  selector: 'app-usuario',
  imports: [
    HeaderMenuComponent,
    LogoComponent,
    Route,
    PedidoComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  usuario: User | null = null;
  orders: Order[] = [];

  constructor(private authService: AuthService, private userService: UserService, private orderServide: OrderService, private router: Router) { }

  ngOnInit() {
    const number = this.authService.getUserIdFromToken();
    if(number) {
      this.userService.getUserById(number).subscribe(data => this.usuario = data[0]);
      this.orderServide.getAllUserOrders(number).subscribe(result => this.orders = result);
    } else {
      this.router.navigate(['/login']);
    }
  }

  adminClick() {
    this.router.navigate(['/admin']);
  }

  cerrarSesion() {
    this.authService.deleteToken();
    this.router.navigate(['/home']);
  }

}
