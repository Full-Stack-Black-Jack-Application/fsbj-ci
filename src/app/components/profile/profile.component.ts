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
        document.getElementById("jackName")!.innerHTML = `${data.firstName} ${data.lastName}`;
        document.getElementById("jackBalance")!.innerHTML = `$${data.balance}`;
        document.getElementById("jackFirstName")!.innerHTML = `${data.firstName}`;
        document.getElementById("jackLastName")!.innerHTML = `${data.lastName}`;
        document.getElementById("jackEmail")!.innerHTML = `${data.email}`;
    }
  }

  async jackEditFirstName(): Promise<void> {
    if (document.getElementById("jackFirstNameButton")?.innerHTML == "Edit") {
      const inputNode = document.createElement("input");
      inputNode.setAttribute("id", "jackFirstNameInput")
      const jackFirstNameDiv = document.getElementById("jackFirstNameDiv");
      if (jackFirstNameDiv) {jackFirstNameDiv.insertBefore(inputNode, jackFirstNameDiv.firstChild);}
      document.getElementById("jackFirstNameButton")!.innerHTML = "Save";
      return;
    }

    if (document.getElementById("jackFirstNameButton")?.innerHTML == "Save") {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          const jackFirstNameInputValue = (<HTMLInputElement> document.getElementById("jackFirstNameInput")).value;
          const updatedUserObject = {
            "firstName": (jackFirstNameInputValue == "" ? data.firstName : jackFirstNameInputValue),
            "lastName": data.lastName,
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
            document.getElementById("jackFirstName")!.innerHTML = updatedUserObject.firstName;
          }
      }
      document.getElementById('jackFirstNameInput')?.remove();
      document.getElementById("jackFirstNameButton")!.innerHTML = "Edit";
      return;
    }
  }

  async jackEditLastName(): Promise<void> {
    if (document.getElementById("jackLastNameButton")?.innerHTML == "Edit") {
      const inputNode = document.createElement("input");
      inputNode.setAttribute("id", "jackLastNameInput")
      const jackLastNameDiv = document.getElementById("jackLastNameDiv");
      if (jackLastNameDiv) {jackLastNameDiv.insertBefore(inputNode, jackLastNameDiv.firstChild);}
      document.getElementById("jackLastNameButton")!.innerHTML = "Save";
      return;
    }

    if (document.getElementById("jackLastNameButton")?.innerHTML == "Save") {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          const jackLastNameInputValue = (<HTMLInputElement> document.getElementById("jackLastNameInput")).value;
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
      document.getElementById('jackLastNameInput')?.remove();
      document.getElementById("jackLastNameButton")!.innerHTML = "Edit";
      return;
    }
  }

  async jackEditEmail(): Promise<void> {
    if (document.getElementById("jackEmailButton")?.innerHTML == "Edit") {
      const inputNode = document.createElement("input");
      inputNode.setAttribute("id", "jackEmailInput")
      const jackEmailDiv = document.getElementById("jackEmailDiv");
      if (jackEmailDiv) {jackEmailDiv.insertBefore(inputNode, jackEmailDiv.firstChild);}
      document.getElementById("jackEmailButton")!.innerHTML = "Save";
      return;
    }

    if (document.getElementById("jackEmailButton")?.innerHTML == "Save") {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          const jackEmailInputValue = (<HTMLInputElement> document.getElementById("jackEmailInput")).value;
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
      document.getElementById('jackEmailInput')?.remove();
      document.getElementById("jackEmailButton")!.innerHTML = "Edit";
      return;
    }
  }

  async jackEditPassword(): Promise<void> {
    if (document.getElementById("jackPasswordButton")?.innerHTML == "Edit") {
      const inputNode = document.createElement("input");
      inputNode.setAttribute("id", "jackPasswordInput")
      const jackPasswordDiv = document.getElementById("jackPasswordDiv");
      if (jackPasswordDiv) {jackPasswordDiv.insertBefore(inputNode, jackPasswordDiv.firstChild);}
      document.getElementById("jackPasswordButton")!.innerHTML = "Save";
      return;
    }

    if (document.getElementById("jackPasswordButton")?.innerHTML == "Save") {
      const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
      if (res.status === 200) {
          const data = await res.json();
          const jackPasswordInputValue = (<HTMLInputElement> document.getElementById("jackPasswordInput")).value;
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
      document.getElementById('jackPasswordInput')?.remove();
      document.getElementById("jackPasswordButton")!.innerHTML = "Edit";
      return;
    }
  }

  jackEditBalance(): void {
    if (document.getElementById("jackBalanceButton")?.innerHTML == "Edit") {
      const buttonWithdrawalNode = document.createElement("button");
      buttonWithdrawalNode.innerHTML = "Withdrawal";
      buttonWithdrawalNode.setAttribute("id", "jackBalanceWithdrawalButton");
      buttonWithdrawalNode.addEventListener('click', this.jackBalanceWithdrawal);
      buttonWithdrawalNode.setAttribute(
        'style',
        'width: 130px; font-family: "Bebas Neue"; border-radius: 5px; background-color: white; cursor: pointer; font-size: 20px;'
      );
      const buttonDepositNode = document.createElement("button");
      buttonDepositNode.innerHTML = "Deposit";
      buttonDepositNode.setAttribute("id", "jackBalanceDepositButton")
      buttonDepositNode.addEventListener('click', this.jackBalanceDeposit);
      buttonDepositNode.setAttribute(
        'style',
        'width: 130px; font-family: "Bebas Neue"; border-radius: 5px; background-color: white; cursor: pointer; font-size: 20px;'
      );

      const inputNode = document.createElement("input");
      inputNode.setAttribute("id", "jackBalanceInput")
      inputNode.setAttribute("type", "number")
      const jackBalanceDiv = document.getElementById("jackBalanceDiv");
      if (jackBalanceDiv) {
        jackBalanceDiv.insertBefore(buttonWithdrawalNode, jackBalanceDiv.firstChild);
        jackBalanceDiv.insertBefore(buttonDepositNode, jackBalanceDiv.firstChild);
        jackBalanceDiv.insertBefore(inputNode, jackBalanceDiv.firstChild);
      }
      document.getElementById("jackBalanceButton")!.innerHTML = "Finish";
      return;
    }

    if (document.getElementById("jackBalanceButton")?.innerHTML == "Finish") {
      document.getElementById('jackBalanceInput')?.remove();
      document.getElementById('jackBalanceDepositButton')?.remove();
      document.getElementById('jackBalanceWithdrawalButton')?.remove();
      document.getElementById("jackBalanceButton")!.innerHTML = "Edit";
      return;
    }
  }

  async jackBalanceDeposit(): Promise<void> {
    const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
    if (res.status === 200) {
        const data = await res.json();
        let jackBalanceInputValue = (<HTMLInputElement> document.getElementById("jackBalanceInput")).valueAsNumber;
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
    document.getElementById('jackBalanceInput')?.remove();
    document.getElementById('jackBalanceDepositButton')?.remove();
    document.getElementById('jackBalanceWithdrawalButton')?.remove();
    document.getElementById("jackBalanceButton")!.innerHTML = "Edit";
    return;
  }

  async jackBalanceWithdrawal(): Promise<void> {
    const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
    if (res.status === 200) {
        const data = await res.json();
        let jackBalanceInputValue = (<HTMLInputElement> document.getElementById("jackBalanceInput")).valueAsNumber;
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
    document.getElementById('jackBalanceInput')?.remove();
    document.getElementById('jackBalanceDepositButton')?.remove();
    document.getElementById('jackBalanceWithdrawalButton')?.remove();
    document.getElementById("jackBalanceButton")!.innerHTML = "Edit";
    return;
  }
}
