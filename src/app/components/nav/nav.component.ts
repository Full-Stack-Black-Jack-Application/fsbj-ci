import { Component, OnInit } from '@angular/core';
import { url } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signOut() {
    window.location.reload();
    window.location.href = url + 'login'
  }
}
