import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ConfirmacioncompraComponent } from './pages/confirmacioncompra/confirmacioncompra.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PaymentResultComponent } from './pages/payment-result/payment-result.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        title: 'Joryan Bags',
        component: HomeComponent,
    },
    {
        path: 'catalogo',
        title: 'Catalogo | Joryan Bags',
        component: CatalogoComponent
    },
    {
        path: 'producto/:id',
        title: 'Producto | Joryan Bags',
        component: ProductoComponent
    },
    {
        path: 'carrito',
        title: 'Carrito | Joryan Bags',
        component: CarritoComponent
    },
    {
        path: 'checkout',
        title: 'Checkout | Joryan Bags',
        component: CheckoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'confirmacioncompra',
        title: 'Confirmacion | Joryan Bags',
        component: ConfirmacioncompraComponent
    },
    {
        path: 'login',
        title: 'Login | Joryan Bags',
        component: LoginComponent
    },
    {
        path: 'admin',
        title: 'Administradción | Joryan Bags',
        component: AdminComponent
    },
    {
        path: 'usuario',
        title: 'Usuario | Joryan Bags',
        component: UsuarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'registro',
        title: 'Confirmacion | Joryan Bags',
        component: RegistroComponent 
    },
    {
        path: 'payment-result',
        title: 'Pago | Joryan Bags',
        component: PaymentResultComponent
    }
];
