import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public ac: AppComponent) { }

  ngOnInit(): void {
  }

  show = true;
  hide = false;

  toggle() {
    this.show = !this.show;
    this.hide = !this.hide;
  }
}
