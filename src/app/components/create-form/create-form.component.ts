import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UnicornsService} from "../../services/unicorns.service";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html'
})
export class CreateFormComponent implements OnInit {
  constructor(private unicornService: UnicornsService) {}

  @Input() title: string

  form = new FormGroup({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    age: new FormControl<number|null>(null),
    gender: new FormControl<string>('')
  })

  get firstName () {
    return this.form.controls.firstName as FormControl;
  }

  ngOnInit(): void {}

  submit() {
    // @ts-ignore
    const idUser = Math.floor(Math.random() * 101); // генерим id при создании пользователя
    this.unicornService.create({
      id: idUser,
      firstName: this.form.value.firstName as string,
      lastName: this.form.value.lastName as string,
      email: this.form.value.email as string,
      age: this.form.value.age as number,
      gender: this.form.value.gender as string,
    }).subscribe(() => {
      this.unicornService;
      this.form.reset();
    })
  }
}
