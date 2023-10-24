import {Component, Input} from "@angular/core";
import {IUnicorn} from "../../models/unicorn";
import {UnicornsService} from "../../services/unicorns.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-unicorn',
  templateUrl: './unicorn.component.html'
})
export class UnicornComponent {
  constructor(
    private unicornService: UnicornsService) {}


  editForm = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    age: new FormControl<number|null>(null),
    gender: new FormControl<string>('')
  })

  ngOnInit(): void {}

  @Input() unicorn: IUnicorn;

  isEditable = false;

  makeEditable () {
    this.isEditable = true;
    this.editForm.patchValue(this.unicorn);
  }

  saveEdit() {
    this.isEditable = false;

    // @ts-ignore
    const editedData: Partial<IUnicorn> = this.editForm.value;

    this.unicornService.edit({ ...this.unicorn, ...editedData })
      .subscribe(updatedVal => {
        this.unicorn = updatedVal;
      });
  }

  remove(unicorn: IUnicorn) {
    this.unicornService.delete(unicorn)
      .subscribe(() => {
      this.unicornService.getAll().subscribe();
    })
  }
}
