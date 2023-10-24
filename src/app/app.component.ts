import {Component, OnInit} from '@angular/core';
import {UsersService} from "./services/users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'CRUD app AngularJS v.16';

  constructor(
    public userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe();
  }
}
