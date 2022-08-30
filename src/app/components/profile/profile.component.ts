import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) {
    if (document.cookie === "") {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
    if (res.status === 200) {
        const data = await res.json();
        //document.getElementById("jackName")!.innerHTML = `${data.firstName} ${data.lastName}`;
        document.getElementById("jackBalance")!.innerHTML = `$${data.balance}`;
        document.getElementById("jackFirstName")!.innerHTML = `${data.firstName}`;
        document.getElementById("jackLastName")!.innerHTML = `${data.lastName}`;
        document.getElementById("jackEmail")!.innerHTML = `${data.email}`;
    }
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

  async toggle() {
    this.show = !this.show;

    let jackFirstNameInputValue;
    if (this.show) {jackFirstNameInputValue = (<HTMLInputElement> document.getElementById("jackFirstNameInput")).value;}

    this.hide = !this.hide;
    if (this.show) {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          const updatedUserObject = {
            "firstName": (jackFirstNameInputValue == "" ? data.firstName : jackFirstNameInputValue),
            "lastName": data.lastName,
            "email": data.email,
            "pswd": data.pswd,
            "balance": data.balance,
            "referralCode": data.referralCode
          };
          console.log(updatedUserObject);

          const resb = await fetch(`http://localhost:5000/api/users/update/${data.id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUserObject)
          });
          if (resb.status === 200) {
            document.getElementById("jackFirstName")!.innerHTML = updatedUserObject.firstName;
          }
      }
    }
  }

  async toggle1() {
    this.show1 = !this.show1;

    let jackLastNameInputValue;
    if (this.show1) {jackLastNameInputValue = (<HTMLInputElement> document.getElementById("jackLastNameInput")).value;}

    this.hide1 = !this.hide1;
    if (this.show1) {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          const updatedUserObject = {
            "firstName": data.firstName,
            "lastName": (jackLastNameInputValue == "" ? data.lastName : jackLastNameInputValue),
            "email": data.email,
            "pswd": data.pswd,
            "balance": data.balance,
            "referralCode": data.referralCode
          };

          const resb = await fetch(`http://localhost:5000/api/users/update/${data.id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUserObject)
          });
          if (resb.status === 200) {
            document.getElementById("jackLastName")!.innerHTML = updatedUserObject.lastName;
          }
      }
    }
  }

  async toggle2() {
    this.show2 = !this.show2;

    let jackEmailInputValue;
    if (this.show2) {jackEmailInputValue = (<HTMLInputElement> document.getElementById("jackEmailInput")).value;}

    this.hide2 = !this.hide2;

    if (this.show2) {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          const updatedUserObject = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": (jackEmailInputValue == "" ? data.email : jackEmailInputValue),
            "pswd": data.pswd,
            "balance": data.balance,
            "referralCode": data.referralCode
          };

          const resb = await fetch(`http://localhost:5000/api/users/update/${data.id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUserObject)
          });
          if (resb.status === 200) {
            document.getElementById("jackEmail")!.innerHTML = updatedUserObject.email;
            document.cookie = `jackUsername=${updatedUserObject.email}; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;`;
          }
      }
    }
  }

  async toggle3() {
    this.show3 = !this.show3;

    let jackPasswordInputValue;
    if (this.show3) {jackPasswordInputValue = (<HTMLInputElement> document.getElementById("jackPasswordInput")).value;}

    this.hide3 = !this.hide3;

    if (this.show3) {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          const updatedUserObject = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": data.email,
            "pswd": (jackPasswordInputValue == "" ? data.pswd : jackPasswordInputValue),
            "balance": data.balance,
            "referralCode": data.referralCode
          };

          const resb = await fetch(`http://localhost:5000/api/users/update/${data.id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUserObject)
          });
          if (resb.status === 200) {
            //document.getElementById("jackPassword")!.innerHTML = updatedUserObject.pswd;
          }
      }
    }
  }

  toggle4() {
    this.show4 = !this.show4;
    this.hide4 = !this.hide4;
  }

  async jackBalanceDeposit(): Promise<void> {
    this.show4 = !this.show4;

    let jackBalanceInputValue = 0;
    if (this.show4) {jackBalanceInputValue = (<HTMLInputElement> document.getElementById("jackBalanceInput")).valueAsNumber;}
    this.hide4 = !this.hide4;

    if (this.show4) {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          if (isNaN(jackBalanceInputValue)) {jackBalanceInputValue = 0};
          const updatedUserObject = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": data.email,
            "pswd": data.pswd,
            "balance": (jackBalanceInputValue <= 0 ? data.balance : jackBalanceInputValue+data.balance),
            "referralCode": data.referralCode
          };

          const resb = await fetch(`http://localhost:5000/api/users/update/${data.id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUserObject)
          });
          if (resb.status === 200) {
            document.getElementById("jackBalance")!.innerHTML = `$${updatedUserObject.balance}`;
          }
      }
    }
  }

  async jackBalanceWithdrawal(): Promise<void> {
    this.show4 = !this.show4;

    let jackBalanceInputValue = 0;
    if (this.show4) {jackBalanceInputValue = (<HTMLInputElement> document.getElementById("jackBalanceInput")).valueAsNumber;}
    this.hide4 = !this.hide4;

    if (this.show4) {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          if (isNaN(jackBalanceInputValue)) {jackBalanceInputValue = 0};
          const updatedUserObject = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": data.email,
            "pswd": data.pswd,
            "balance": (jackBalanceInputValue >= data.balance ? 0 : data.balance-jackBalanceInputValue),
            "referralCode": data.referralCode
          };

          const resb = await fetch(`http://localhost:5000/api/users/update/${data.id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUserObject)
          });
          if (resb.status === 200) {
            document.getElementById("jackBalance")!.innerHTML = `$${updatedUserObject.balance}`;
          }
      }
    }
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
