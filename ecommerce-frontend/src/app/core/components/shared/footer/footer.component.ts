import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}

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
}
