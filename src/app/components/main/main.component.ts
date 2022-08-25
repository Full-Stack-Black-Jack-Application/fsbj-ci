import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  static currentValue: number = 0;
  static aceCount: number = 0;
  static deckIDGlobal: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  async jackStartBlackJack(): Promise<void> {
    MainComponent.currentValue = 0;
    MainComponent.aceCount = 0;
    const jackPlayButton = document.getElementById("jackPlayButton");
    if (jackPlayButton != null) {
      jackPlayButton.remove();
    }

    const jackGameBoard = document.getElementById("jackGameBoard");
    const pNode = document.createElement("p");
    pNode.setAttribute("id", "jackGameCurrentValue");
    pNode.innerHTML = `Current Value: ${MainComponent.currentValue}`;

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(pNode);
    }

    const deckID = await this.jackGrabDeckID();
    //const deckID = "mpczv0euyqyf";
    MainComponent.deckIDGlobal = deckID;

    let buttonNode = document.createElement("button");
    buttonNode.innerHTML = "Hit";
    buttonNode.addEventListener('click', this.jackGameHit);
    buttonNode.setAttribute("id", "jackGameHitButton");

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(buttonNode);
    }
    buttonNode = document.createElement("button");
    buttonNode.innerHTML = "Stand";
    buttonNode.addEventListener('click', this.jackGameStand);
    buttonNode.setAttribute("id", "jackGameStandButton");

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(buttonNode);
      jackGameBoard.appendChild(document.createElement("br"));
    }

    let playingCard = await MainComponent.jackDrawCard(deckID);
    let playingCardImage = document.createElement("IMG");
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(playingCardImage);
    }

    if (isNaN(playingCard.cards[0].value)) {
      if (playingCard.cards[0].value == "ACE") {
        MainComponent.currentValue += 11;
        MainComponent.aceCount += 1;
      } else {
        MainComponent.currentValue += 10;
      }
    } else {
      MainComponent.currentValue += Number(playingCard.cards[0].value);
    }

    const jackGameCurrentValue = document.getElementById("jackGameCurrentValue");
    if (jackGameCurrentValue != null) {
      jackGameCurrentValue.innerHTML = `Current Value: ${MainComponent.currentValue}`;
    }

    //

    playingCard = await MainComponent.jackDrawCard(deckID);
    playingCardImage = document.createElement("IMG");
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);

    if (jackGameBoard != null) {
      jackGameBoard.appendChild(playingCardImage);
    }

    if (isNaN(playingCard.cards[0].value)) {
      if (playingCard.cards[0].value == "ACE") {
        MainComponent.currentValue += 11;
        MainComponent.aceCount += 1;
      } else {
        MainComponent.currentValue += 10;
      }
    } else {
      MainComponent.currentValue += Number(playingCard.cards[0].value);
    }
    if (jackGameCurrentValue != null) {
      jackGameCurrentValue.innerHTML = `Current Value: ${MainComponent.currentValue}`;
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
    const playingCard = await MainComponent.jackDrawCard(MainComponent.deckIDGlobal);
    const playingCardImage = document.createElement("IMG");
    playingCardImage.setAttribute("src", playingCard.cards[0].image);
    playingCardImage.setAttribute("alt", playingCard.cards[0].value);

    const jackGameBoard = document.getElementById("jackGameBoard");
    if (jackGameBoard != null) {
      jackGameBoard.appendChild(playingCardImage);
    }

    if (isNaN(playingCard.cards[0].value)) {
      if (playingCard.cards[0].value == "ACE") {
        MainComponent.currentValue += 11;
        MainComponent.aceCount += 1;
      } else {
        MainComponent.currentValue += 10;
      }
    } else {
      MainComponent.currentValue += Number(playingCard.cards[0].value);
    }
    const jackGameCurrentValue = document.getElementById("jackGameCurrentValue");
    if (jackGameCurrentValue != null) {
      jackGameCurrentValue.innerHTML = `Current Value: ${MainComponent.currentValue}`;
    }

    if (MainComponent.currentValue > 21) {
      if (MainComponent.aceCount > 0) {
        // typescript is hard ~ richard
        MainComponent.currentValue -= (MainComponent.aceCount * 11);
        MainComponent.currentValue += (MainComponent.aceCount);
        MainComponent.aceCount = 0;

        const jackGameCurrentValue = document.getElementById("jackGameCurrentValue");
        if (jackGameCurrentValue != null) {
          jackGameCurrentValue.innerHTML = `Current Value: ${MainComponent.currentValue}`;
          jackGameCurrentValue.innerHTML += ", soft bust. Previous aces now count as 1."
        }
      } else {
        const jackGameCurrentValue = document.getElementById("jackGameCurrentValue");
        if (jackGameCurrentValue != null) {
          jackGameCurrentValue.innerHTML += ", Bust!"
          document.getElementById("jackGameHitButton")?.remove();
          document.getElementById("jackGameStandButton")?.remove();
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
    pNode.innerHTML = `Dealer's Current Value: ${dealerCurrentValue}`;

    const jackGameBoard = document.getElementById("jackGameBoard");
    if (jackGameBoard != null) {
      jackGameBoard.appendChild(pNode);
    }

    const jackGameDealerValue = document.getElementById("jackGameDealerValue");
    while (dealerCurrentValue < Math.min(MainComponent.currentValue + 1, 17)) {
      const playingCard = await MainComponent.jackDrawCard(MainComponent.deckIDGlobal);
      const playingCardImage = document.createElement("IMG");
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
    if (MainComponent.currentValue >= dealerCurrentValue || dealerCurrentValue > 21) {
        pNode.innerHTML = `You won!`;
    } else {
        pNode.innerHTML = `You lost...`;
    }
    if (jackGameBoard != null) {
      jackGameBoard.appendChild(pNode);
    }
  }
}
