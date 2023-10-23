import {Component, OnInit} from '@angular/core';
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html'
})
export class AppErrorComponent implements OnInit {
  constructor(public errorService: ErrorService) {}

  ngOnInit(): void {}

}
