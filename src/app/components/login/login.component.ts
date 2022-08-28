import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ClientMessage } from 'src/app/models/client-message';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  pswd: string = '';

  isLoading = false;

  loginErrMsg = '';

  clientMessage: ClientMessage = new ClientMessage('');

  user: User = new User(0, 0, 0, 0, ``, ``, ``, ``, ``);

  constructor(private authService: AuthService, private appComponent: AppComponent, private userService: UserService, private router: Router) {
    AppComponent.isLoggedIn = false;
    document.cookie = `jackUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
   }

   async login() {
    const loginObject = {
      "email": (<HTMLInputElement> document.getElementById("username"))?.value.trim(),
      "pswd": (<HTMLInputElement> document.getElementById("pswd"))?.value.trim()
    };

    const res = await fetch(`http://localhost:5000/api/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginObject)
    });

    if (res.status === 200) {
      AppComponent.isLoggedIn = true;
      const data = await res.json();
      document.cookie = `jackUsername=${loginObject.email}; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;`;
      this.router.navigate(['/main']);
      //console.log(data);
    }

    if (res.status === 401) {
      //console.log("Unauth");
    }

    if(!this.email.trim() || !this.pswd.trim()) {
      this.loginErrMsg = 'Failed Login';
      return;
    }

    this.isLoading = true;
    this.authService.login(this.email, this.pswd)
      .subscribe(
        (response) => {
          this.isLoading= false;

          console.log(response);

            let token: string | null = response.headers.get('blackjack-token') || '{}';

            sessionStorage.setItem('token', token);

            AppComponent.isLoggedIn = true;
            this.appComponent.updateUserInfo(response.body.email)
        },
        () => {
          this.isLoading = false;
          this.loginErrMsg = 'Login Failed'
        }
      );

      this.email = '';
      this.pswd = '';
    }

    async registerUser() {
      const registerObject = {
        "email": (<HTMLInputElement> document.getElementById("email"))?.value.trim(),
        "firstName": (<HTMLInputElement> document.getElementById("fName"))?.value.trim(),
        "lastName": (<HTMLInputElement> document.getElementById("lName"))?.value.trim(),
        "pswd": (<HTMLInputElement> document.getElementById("pswdSignUp"))?.value.trim(),
        "referralCode": (<HTMLInputElement> document.getElementById("refCode"))?.value.trim()
      };

      const res = await fetch(`http://localhost:5000/api/users`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(registerObject)
      });

      if (res.status === 200) {
        AppComponent.isLoggedIn = true;
        const data = await res.json();
        document.cookie = `jackUsername=${registerObject.email}; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;`;
        this.router.navigate(['/main']);
      }
      this.userService.registerUser(this.user)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.clientMessage.message = `Registration Seuccessful ${data.firstName, data.lastName}`
          this.router.navigate(['/main']);
        },
        error: (error) => this.clientMessage.message = `Please try again ${error}`,
        complete: () => console.log('Complete')
      });
    }
}
