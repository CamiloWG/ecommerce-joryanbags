import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

import { CommonModule } from "@angular/common";
@Component({
  selector: "building-blocks-segmented-butt",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
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
  /** Style props */
  @Input() buildingBlocksSegmentedButtTop: string | number = "";
  @Input() buildingBlocksSegmentedButtLeft: string | number = "";
  @Input() containerPadding: string | number = "";

  get buildingBlocksSegmentedButtStyle() {
    return {
      top: this.buildingBlocksSegmentedButtTop,
      left: this.buildingBlocksSegmentedButtLeft,
    };
  }

  get containerStyle() {
    return {
      padding: this.containerPadding,
    };
  }
}
