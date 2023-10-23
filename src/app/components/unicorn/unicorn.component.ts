import {Component, Input} from "@angular/core";
import {IUnicorn} from "../../models/unicorn";
import {UnicornsService} from "../../services/unicorns.service";

@Component({
  selector: 'app-unicorn',
  templateUrl: './unicorn.component.html'
})
export class UnicornComponent {
  constructor(private unicornService: UnicornsService) {}

  @Input() unicorn: IUnicorn;

  remove() {
    return this.unicornService.delete({
      _id: this.unicorn?._id as string
    }).subscribe(() => {
      this.unicornService;
    })
  }
}
