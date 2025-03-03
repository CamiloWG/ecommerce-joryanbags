import { Component } from '@angular/core';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { HeaderMenuComponent } from '../../core/components/header-menu/header-menu.component';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
    HeaderMenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
