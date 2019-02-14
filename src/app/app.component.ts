import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public error = false;
  public users;

  constructor(public userService: UserService) {}

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.error = false;
    });
  }

  getUsersWithError() {
    this.userService.getUsersWithError().subscribe(
      users => {
        this.users = users;
        this.error = false;
      },
      () => {
        this.error = true;
        this.users = [];
      }
    );
  }
}
