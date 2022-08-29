import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public ac: AppComponent, private router: Router) {
    if (document.cookie === "") {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
    if (res.status === 200) {
        const data = await res.json();
        document.getElementById("jackWelcomeName")!.innerHTML = `Welcome ${data.firstName} ${data.lastName}`;
        document.getElementById("jackWins")!.innerHTML = `${data.wins}`;
        document.getElementById("jackLosses")!.innerHTML = `${data.losses}`;
        document.getElementById("jackBalance")!.innerHTML = `$${data.balance}`;
        document.getElementById("jackReferral")!.innerHTML = `${data.referralCode}`;
    }
  }

  show = true;
  hide = false;

  toggle() {
    this.show = !this.show;
    this.hide = !this.hide;
  }
}
