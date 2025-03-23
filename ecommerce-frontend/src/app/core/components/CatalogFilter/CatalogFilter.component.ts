import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { Text1 } from "./Text1/Text1.component";
import { Tag } from "./Tag/Tag.component";
import { CheckboxGroup } from "./CheckboxGroup/CheckboxGroup.component";
import { SliderField } from "./SliderField/SliderField.component";


@Component({
  selector: "catalog-filter",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [Text1, Tag, CheckboxGroup, SliderField],
  templateUrl: "./CatalogFilter.component.html",
})
export class CatalogFilterComponent {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
