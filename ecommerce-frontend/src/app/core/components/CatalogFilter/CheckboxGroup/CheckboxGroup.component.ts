import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { CheckboxField } from "../../shared/CheckboxField/CheckboxField.component";

@Component({
  selector: "checkbox-group",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CheckboxField],
  templateUrl: "./CheckboxGroup.component.html",
})
export class CheckboxGroup {
  @HostBinding("style.display") display = "contents";

  constructor() {}
}
