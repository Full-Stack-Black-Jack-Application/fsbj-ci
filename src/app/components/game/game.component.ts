import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  static currentValue: number = 0;
  static aceCount: number = 0;
  static deckIDGlobal: string = "";
  static isDisabled: boolean = false;
  static currentUserBalance: number = 0;
  static currentUserID: number = 0;

  constructor(private router: Router) {
    if (document.cookie === "") {
      this.router.navigate(['/login']);
    }
  }

  async ngOnInit(): Promise<void> {
    const res = await fetch(`http://localhost:5000/api/users/${document.cookie.split("=")[1]}`);
    if (res.status === 200) {
        const data = await res.json();
        document.getElementById("jackCurrentBalance")!.innerHTML = `$${data.balance}`;
        GameComponent.currentUserBalance = data.balance;
        GameComponent.currentUserID = data.id;
    }
  }

  get getIsDisabled() {
    return GameComponent.isDisabled;
  }

  async jackStartBlackJack(): Promise<void> {
    if (GameComponent.currentUserBalance < (<HTMLInputElement> document.getElementById("jackWagerAmount")).valueAsNumber) {
      document.getElementById("jackPlayButton")!.innerHTML = "Insufficient Funds";
      return;
    }

    document.getElementById("jackGameBoard")?.remove();
    const newJackGameBoard = document.createElement("div");
    newJackGameBoard.setAttribute("id", "jackGameBoard",);
    newJackGameBoard.setAttribute("class", "game",);
    document.getElementById("jackFrame")?.appendChild(newJackGameBoard);

    GameComponent.currentValue = 0;
    GameComponent.aceCount = 0;
    const jackPlayButton = document.getElementById("jackPlayButton");
    if (jackPlayButton != null) {
      jackPlayButton.innerHTML = "Game In Progress"
      GameComponent.isDisabled = true;
    }

    const jackGameBoard = document.getElementById("jackGameBoard");
    const pNode = document.createElement("p");
    pNode.setAttribute("id", "jackGameCurrentValue",);
    pNode.setAttribute(
      'style',
      'color: white; font-size: 30px; font-family: "Bebas Neue";'
    );

    pNode.innerHTML = `Current Value: ${GameComponent.currentValue}`;

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(pNode);
    }

    const deckID = await this.jackGrabDeckID();
    //const deckID = "mpczv0euyqyf";
    GameComponent.deckIDGlobal = deckID;

    let buttonNode = document.createElement("button");
    buttonNode.setAttribute(
      'style',
      'padding: 10px; margin: -10px auto 20px auto; width: 130px; font-family: "Bebas Neue"; border-radius: 5px; background-color: white; cursor: pointer; font-size: 20px;'
    )
    buttonNode.innerHTML = "Hit";
    buttonNode.addEventListener('click', this.jackGameHit);
    buttonNode.setAttribute("id", "jackGameHitButton");

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(buttonNode);
    }
    buttonNode = document.createElement("button");
    buttonNode.setAttribute(
      'style',
      'padding: 10px; margin: -10px auto 20px auto;  width: 130px; font-family: "Bebas Neue"; border-radius: 5px; background-color: white; cursor: pointer; auto; font-size: 20px;'
      )
    buttonNode.innerHTML = "Stand";
    buttonNode.addEventListener('click', this.jackGameStand);
    buttonNode.setAttribute("id", "jackGameStandButton");

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(buttonNode);
      jackGameBoard.appendChild(document.createElement("br"));
    }

    let playingCard = await GameComponent.jackDrawCard(deckID);
    let playingCardImage = document.createElement("img");
    playingCardImage.style.height = '220px';
    playingCardImage.style.margin = "-15px auto -10px 0px";
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(playingCardImage);
    }

    if (isNaN(playingCard.cards[0].value)) {
      if (playingCard.cards[0].value == "ACE") {
        GameComponent.currentValue += 11;
        GameComponent.aceCount += 1;
      } else {
        GameComponent.currentValue += 10;
      }
    } else {
      GameComponent.currentValue += Number(playingCard.cards[0].value);
    }

    const jackGameCurrentValue = document.getElementById("jackGameCurrentValue");
    if (jackGameCurrentValue != null) {
      jackGameCurrentValue.innerHTML = `Current Value: ${GameComponent.currentValue}`;
    }

    //

    playingCard = await GameComponent.jackDrawCard(deckID);
    playingCardImage = document.createElement("img");
    playingCardImage.style.height = '220px';
    playingCardImage.style.margin = "-15px auto -10px 0px";
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(playingCardImage);
    }

    if (isNaN(playingCard.cards[0].value)) {
      if (playingCard.cards[0].value == "ACE") {
        GameComponent.currentValue += 11;
        GameComponent.aceCount += 1;
      } else {
        GameComponent.currentValue += 10;
      }
    } else {
      GameComponent.currentValue += Number(playingCard.cards[0].value);
    }
    if (jackGameCurrentValue != null) {
      jackGameCurrentValue.innerHTML = `Current Value: ${GameComponent.currentValue}`;
    }
  }

  async jackGrabDeckID(): Promise<any>  {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    if (res.status === 200) {
        const data = await res.json();
        return data.deck_id;
    }
  }

  static async jackDrawCard(deckID: string): Promise<any> {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
    if (res.status === 200) {
        const data = await res.json();
        return data;
    }
  }

  async jackGameHit(): Promise<void> {
    const playingCard = await GameComponent.jackDrawCard(GameComponent.deckIDGlobal);
    const playingCardImage = document.createElement("img");
    playingCardImage.style.height = '220px';
    playingCardImage.style.margin = "-15px auto -10px 0px";
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);

    const jackGameBoard = document.getElementById("jackGameBoard");
    if (jackGameBoard != null) {
      jackGameBoard.appendChild(playingCardImage);
    }

    if (isNaN(playingCard.cards[0].value)) {
      if (playingCard.cards[0].value == "ACE") {
        GameComponent.currentValue += 11;
        GameComponent.aceCount += 1;
      } else {
        GameComponent.currentValue += 10;
      }
    } else {
      GameComponent.currentValue += Number(playingCard.cards[0].value);
    }
    const jackGameCurrentValue = document.getElementById("jackGameCurrentValue");
    if (jackGameCurrentValue != null) {
      jackGameCurrentValue.innerHTML = `Current Value: ${GameComponent.currentValue}`;
    }

    if (GameComponent.currentValue > 21) {
      if (GameComponent.aceCount > 0) {
        // typescript is hard ~ richard
        GameComponent.currentValue -= (GameComponent.aceCount * 11);
        GameComponent.currentValue += (GameComponent.aceCount);
        GameComponent.aceCount = 0;

        const jackGameCurrentValue = document.getElementById("jackGameCurrentValue");
        if (jackGameCurrentValue != null) {
          jackGameCurrentValue.innerHTML = `Current Value: ${GameComponent.currentValue}`;
          jackGameCurrentValue.innerHTML += ", soft bust. Previous aces now count as 1."
        }
      } else {
        const jackGameCurrentValue = document.getElementById("jackGameCurrentValue");
        if (jackGameCurrentValue != null) {
          let finalAmountb = (<HTMLInputElement> document.getElementById("jackWagerAmount")).valueAsNumber;
          if (finalAmountb < 0) {finalAmountb = 0;}

          jackGameCurrentValue.innerHTML += `, Bust! Lost $${finalAmountb}...`

          GameComponent.currentUserBalance -= finalAmountb;

          const newBalanceObject = {
            "balance": GameComponent.currentUserBalance
          };

          const res = await fetch(`http://localhost:5000/api/users/patch/${GameComponent.currentUserID}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBalanceObject)
          });

          document.getElementById("jackGameHitButton")?.remove();
          document.getElementById("jackGameStandButton")?.remove();
          const jackPlayButton = document.getElementById("jackPlayButton");
          if (jackPlayButton != null) {
            jackPlayButton.innerHTML = "Play Again";
            GameComponent.isDisabled = false;
            document.getElementById("jackCurrentBalance")!.innerHTML = `$${GameComponent.currentUserBalance}`;
          }
        }
      }
    }
  }

  async jackGameStand(): Promise<void> {
    document.getElementById("jackGameHitButton")?.remove();
    document.getElementById("jackGameStandButton")?.remove();

    let dealerCurrentValue = 0;
    let dealerAceCount = 0;
    let pNode = document.createElement("p");
    pNode.setAttribute("id", "jackGameDealerValue");
    pNode.setAttribute(
      'style',
      'color: white; font-size: 30px; font-family: "Bebas Neue";'
    )
    pNode.innerHTML = `Dealer's Current Value: ${dealerCurrentValue}`;

    const jackGameBoard = document.getElementById("jackGameBoard");
    if (jackGameBoard != null) {
      jackGameBoard.appendChild(pNode);
    }

    const jackGameDealerValue = document.getElementById("jackGameDealerValue");
    while (dealerCurrentValue < Math.min(GameComponent.currentValue + 1, 17)) {
      const playingCard = await GameComponent.jackDrawCard(GameComponent.deckIDGlobal);
      const playingCardImage = document.createElement("IMG");
      playingCardImage.style.height = '220px';
      playingCardImage.style.margin = "-15px auto -10px 0px";
      playingCardImage.setAttribute("src", playingCard.cards[0].image);
      playingCardImage.setAttribute("alt", playingCard.cards[0].value);

      const jackGameBoard = document.getElementById("jackGameBoard");
      if (jackGameBoard != null) {
        jackGameBoard.appendChild(playingCardImage);
      }

      if (isNaN(playingCard.cards[0].value)) {
        if (playingCard.cards[0].value == "ACE") {
          dealerCurrentValue += 11;
          dealerAceCount += 1;
        } else {
          dealerCurrentValue += 10;
        }
      } else {
        dealerCurrentValue += Number(playingCard.cards[0].value);
      }
      //dealerCurrentValue += Math.floor(Math.random() * 10);
        if (jackGameDealerValue != null) {
          jackGameDealerValue.innerHTML = `Dealer's Current Value: ${dealerCurrentValue}`;
        }
        await new Promise(r => setTimeout(r, 250));

        if (dealerCurrentValue > 21 && dealerAceCount > 0) {
          dealerCurrentValue -= (dealerAceCount * 11);
          dealerCurrentValue += (dealerAceCount);
          dealerAceCount = 0;
          if (jackGameDealerValue != null) {
            jackGameDealerValue.innerHTML = `Dealer soft bust, new value: ${dealerCurrentValue}`;
          }
          await new Promise(r => setTimeout(r, 500));
        }
    }

    if (dealerCurrentValue < 21) {
      if (jackGameDealerValue != null) {
        jackGameDealerValue.innerHTML += ", Dealer Stands.";
      }
    }
    else if (dealerCurrentValue > 21) {
      if (jackGameDealerValue != null) {
        jackGameDealerValue.innerHTML += ", Dealer Bust!";
      }
    }

    pNode = document.createElement("p");
    pNode.setAttribute(
      'style',
      'color: white; font-size: 30px; font-family: "Bebas Neue";'
    );
    let finalAmount = (<HTMLInputElement> document.getElementById("jackWagerAmount")).valueAsNumber;
    if (finalAmount < 0) {finalAmount = 0;}
    if (GameComponent.currentValue >= dealerCurrentValue || dealerCurrentValue > 21) {
        pNode.innerHTML = `You won $${finalAmount}!`;
        GameComponent.currentUserBalance += finalAmount;
        const newBalanceObject = {
          "balance": GameComponent.currentUserBalance
        };

        const res = await fetch(`http://localhost:5000/api/users/patch/${GameComponent.currentUserID}`, {
          method: "PATCH",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newBalanceObject)
        });
    } else {
        pNode.innerHTML = `You lost $${finalAmount}...`;
        GameComponent.currentUserBalance -= finalAmount;
        const newBalanceObject = {
          "balance": GameComponent.currentUserBalance
        };

        const res = await fetch(`http://localhost:5000/api/users/patch/${GameComponent.currentUserID}`, {
          method: "PATCH",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newBalanceObject)
        });
    }
    if (jackGameBoard != null) {
      jackGameBoard.appendChild(pNode);
    }

    const jackPlayButton = document.getElementById("jackPlayButton");
    if (jackPlayButton != null) {
      jackPlayButton.innerHTML = "Play Again";
      GameComponent.isDisabled = false;
      document.getElementById("jackCurrentBalance")!.innerHTML = `$${GameComponent.currentUserBalance}`;
    }
  }
}
