import {Component, Input} from "@angular/core";
import {IUser} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  constructor(
    private userService: UsersService) {}


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

  @Input() user: IUser;

  isEditable = false;

  makeEditable () {
    this.isEditable = true;
    this.editForm.patchValue(this.user);
  }

  saveEdit() {
    this.isEditable = false;

    // @ts-ignore
    const editedData: Partial<IUser> = this.editForm.value;

    this.userService.edit({ ...this.user, ...editedData })
      .subscribe(updatedVal => {
        this.user = updatedVal;
      });
  }

  remove(user: IUser) {
    this.userService.delete(user)
      .subscribe(() => {
      this.userService.getAll().subscribe();
    })
  }
}
