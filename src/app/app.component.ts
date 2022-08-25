import { Component, Output } from '@angular/core';
import { useAnimation } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'full-stack-black-jack-ci';

  public isLoggedIn: boolean = false;

  email: string = '';

  updateUserInfo(email: string) {
    this.email = email;
  }

  signOut() {
    window.location.reload();
  }
}
