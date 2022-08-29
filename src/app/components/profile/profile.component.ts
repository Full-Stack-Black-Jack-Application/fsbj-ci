import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  show = true;
  hide = false;
  show1 = true;
  hide1 = false;
  show2 = true;
  hide2 = false;
  show3 = true;
  hide3 = false;
  show4 = true;
  hide4 = false;

  toggle() {
    this.show = !this.show;
    this.hide = !this.hide;
  }

  toggle1() {
    this.show1 = !this.show1;
    this.hide1 = !this.hide1;
  }

  toggle2() {
    this.show2 = !this.show2;
    this.hide2 = !this.hide2;
  }

  toggle3() {
    this.show3 = !this.show3;
    this.hide3 = !this.hide3;
  }

  toggle4() {
    this.show4 = !this.show4;
    this.hide4 = !this.hide4;
  }

//  function Buttontoggle()
//{
  // var a;
  // if (a==1) {
  //   document.getElementById("edit").style.display="inline";
  //   document.getElementById("submit").style.display="none";
  //     return a=0;
  // } else {
  //   document.getElementById("edit").style.display="none";
  //   document.getElementById("submit").style.display="inline";
  //   return a=1;
  // }
}
