import { Component } from '@angular/core';
import { link, mainPages } from '../../interfaces/link.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  links: link[] = mainPages;
}
