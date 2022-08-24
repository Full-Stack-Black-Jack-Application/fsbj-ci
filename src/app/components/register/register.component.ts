import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Address, User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  title = 'Register User'

  // 2-way databinding with ngModel to set the properties of this object=
  user: User = new User(0, ``, ``, ``, ``, ``,[])
  address: Address = new Address('', '', '', '', '');

  constructor(private userService : UserService) { }

  registerUser(): void {


    this.user.addresses.push(this.address);

    this.userService.registerUser(this.user)
    .subscribe(data => console.log(data));

  }



}
