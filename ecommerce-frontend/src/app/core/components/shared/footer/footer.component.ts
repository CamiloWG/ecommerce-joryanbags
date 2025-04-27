import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @HostBinding("style.display") display = "contents";

  constructor(private router: Router, private authService: AuthService) {}

  /** Value props */
  @Input() image5: string = "";
  /** Style props */
  @Input() frameHeaderAlignSelf: string | number = "";
  @Input() frameHeaderPadding: string | number = "";
  @Input() frameDivFlex: string | number = "";
  @Input() frameDivWidth: string | number = "";

  get frameHeaderStyle() {
    return {
      "align-self": this.frameHeaderAlignSelf,
      padding: this.frameHeaderPadding,
    };
  }

  get frameDivStyle() {
    return {
      flex: this.frameDivFlex,
      width: this.frameDivWidth,
    };
  }
  onInicioClick() {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  onCatalogoClick(){
    this.router.navigate(['catalogo']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  onIniciosesionClick() {
    const targetRoute = this.authService.isLoggedIn() ? '/usuario' : '/login';
    this.router.navigate([targetRoute]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  onCarritoClick() {
    this.router.navigate(['/carrito']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  onTyCClick() {
    this.router.navigate(['/terminos-condiciones']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }
}