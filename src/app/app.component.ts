import {Component, OnInit} from '@angular/core';
import {UnicornsService} from "./services/unicorns.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'CRUD app AngularJS v.16';

  constructor(
    public unicornService: UnicornsService
  ) {}

  ngOnInit(): void {
    this.unicornService.getAll().subscribe();
  }
}
