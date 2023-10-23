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
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    colour: new FormControl<string>(''),
    age: new FormControl<number|null>(null)
  })

  get name () {
    return this.form.controls.name as FormControl;
  }

  ngOnInit(): void {}

  submit() {
    this.unicornService.create({
      name: this.form.value.name as string,
      colour: this.form.value.colour as string,
      age: this.form.value.age as number,
    }).subscribe(() => {
      this.unicornService;
    })
  }
}
