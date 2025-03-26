import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cartbill',
  imports: [
    CommonModule
  ],
  templateUrl: './cartbill.component.html',
  styleUrl: './cartbill.component.css'
})
export class CartbillComponent {
  @Input() title: string = 'Mi carro de compras';
  @Input() buttonText: string = 'Checkout';
  @Input() showButton: boolean = true;
}
