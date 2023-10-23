import {Component, OnInit} from '@angular/core';
import {IUnicorn} from "./models/unicorn.js";
import {UnicornsService} from "./services/unicorns.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'CRUD приложение на AngularJS v.16';

  constructor(
    public unicornService: UnicornsService
  ) {}

  ngOnInit(): void {
    this.unicornService.getAll().subscribe();
  }
}
