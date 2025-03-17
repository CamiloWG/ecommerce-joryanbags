import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../core/components/header-menu/header-menu.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderMenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
