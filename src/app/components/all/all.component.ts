import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  title = 'All Users';
  users: User[] = [];

  constructor(private userService: UserService)  { }

  ngOnInit(): void {

    // WHEN the component is intialized, fetch all the users from the DB!
    this.findAllUsers();

  }

  findAllUsers() {
    this.userService.findAllUsers()
      .subscribe(data => {
        this.users = data; // an array of User objects
      })
  }

}
