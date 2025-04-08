import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/shared/header-menu/header-menu.component';
import { LogoComponent } from '../../core/components/shared/logo/logo.component';
import { FooterComponent } from '../../core/components/shared/footer/footer.component';
import { Route } from '../../core/components/shared/Route/Route.component';

@Component({
  selector: 'app-payment-result',
  imports: [
    HeaderMenuComponent,
    LogoComponent,
    FooterComponent,
    Route
  ],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent {

}
