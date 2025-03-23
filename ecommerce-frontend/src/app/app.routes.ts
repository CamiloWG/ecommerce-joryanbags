import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProductoComponent } from './pages/producto/producto.component';

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
        path: 'producto',
        title: 'Producto | Joryan Bags',
        component: ProductoComponent
    }
];
