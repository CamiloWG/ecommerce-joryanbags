import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

@Component({
  selector: "building-blocks-segmented-butt",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: "./BuildingBlocksSegmentedButt.component.html",
})
export class BuildingBlocksSegmentedButt {
  @HostBinding("style.display") display = "contents";

  constructor() {}

  /** Value props */
  @Input() labelText: string = "BUSCAR";
  /** Variant props */
  @Input() configuration: string = "Icon only";
  @Input() selected: boolean = false;
  @Input() state: string = "Disabled";
}
