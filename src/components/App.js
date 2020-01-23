import React from "react";
import "./App.css";
import Player from "./Player";
import Cards from "./Cards";
const getInitialState = () => {
  return {
    deck: [
      "AH",
      "2H",
      "3H",
      "4H",
      "5H",
      "6H",
      "7H",
      "8H",
      "9H",
      "10H",
      "JH",
      "QH",
      "KH",
      "AS",
      "2S",
      "3S",
      "4S",
      "5S",
      "6S",
      "7S",
      "8S",
      "9S",
      "10S",
      "JS",
      "QS",
      "KS",
      "AC",
      "2C",
      "3C",
      "4C",
      "5C",
      "6C",
      "7C",
      "8C",
      "9C",
      "10C",
      "JC",
      "QC",
      "KC",
      "AD",
      "2D",
      "3D",
      "4D",
      "5D",
      "6D",
      "7D",
      "8D",
      "9D",
      "10D",
      "JD",
      "QD",
      "KD"
    ],

    playerDetails: [
      {
        playerId: 1,
        selectedCardsByPlayer: [],
        winner: false
      },
      {
        playerId: 2,
        selectedCardsByPlayer: [],
        winner: false
      }
    ],
    verifyWinner: false,
    winningSequence: []
  };
};
class App extends React.Component {
  state = getInitialState();
  drawCards = playerid => {
    let currentDeck, randomIndex;
    let deckArray = [...this.state.deck];
    let currentPlayerdata = [...this.state.playerDetails];

    if (playerid) {
      if (this.state.deck.length > 0) {
        //get the random index
        randomIndex = this.getRandomIndex(this.state.deck);
        if (randomIndex && randomIndex !== "") {
          currentDeck = deckArray.splice(randomIndex, 1);
        }
        let index = currentPlayerdata.findIndex(
          player => player.playerId === playerid
        );
        //update the selectedcardsbyplayer
        if (currentDeck) {
          currentPlayerdata[index].selectedCardsByPlayer = [
            ...currentPlayerdata[index].selectedCardsByPlayer,
            ...currentDeck
          ];

          this.setState(prevState => ({
            ...prevState,
            deck: [...deckArray],
            playerDetails: currentPlayerdata
          }));
        }
        this.winnerTest(currentPlayerdata, playerid);
      }
    }
  };

  getRandomIndex(dArray) {
    if (dArray.length > 0) {
      let random = Math.floor(Math.random() * dArray.length);
      if (dArray.indexOf(random)) {
        return random;
      }
    }
  }

  winnerTest(finalSelectedArray, id) {
    let cardValues = {
      J: "13",
      Q: "14",
      K: "15",
      A: "16"
    };
    let winnerCheck = [];
    let count = 0;
    let validateStatus = finalSelectedArray.filter(
      item => item.playerId === id
    );
    let validateWinner = validateStatus[0].selectedCardsByPlayer;
    if (validateWinner !== undefined && validateWinner.length >= 4) {
      for (let i = 0; i < validateWinner.length; i++) {
        if (validateWinner[i]) {
          let currentValue = validateWinner[i].split("");
          if (currentValue.length > 2) {
            currentValue = currentValue.slice(0, 2).join("");
          } else {
            currentValue = currentValue.slice(0, 1).join("");
          }
          if (
            currentValue === "A" ||
            currentValue === "Q" ||
            currentValue === "K" ||
            currentValue === "J"
          ) {
            for (let [key, value] of Object.entries(cardValues)) {
              if (key === currentValue) {
                winnerCheck.push(value);
              }
            }
          } else {
            winnerCheck.push(currentValue);
          }
        }
      }
    }
    let len = winnerCheck.length;
    if (len >= 4) {
      for (let i = winnerCheck.length - 1; i > 0; i--) {
        if (+winnerCheck[i - 1] <= +winnerCheck[i]) {
          count++;
        } else {
          break;
        }
      }
      if (count === 3) {
        finalSelectedArray[id - 1].winner = true;
        winnerCheck = validateWinner.slice(len - 4);

        this.setState(prevState => ({
          ...prevState,
          verifyWinner: true,
          winningSequence: winnerCheck
        }));
      }
    }
  }
  reset = () => {
    this.setState(getInitialState());
  };

  render() {
    const winnerValue = this.state.verifyWinner;
    var winner;
    if (winnerValue) {
      winner = this.state.playerDetails.filter(
        player => player.winner === true
      );
    }
    return (
      <div className="container m-auto">
        <div className="row d-flex flex-column">
          <h3
            className="mb-3"
            style={{ color: "indigo", marginTop: "10px", textAlign: "center" }}
          >
            Welcome to Card Deck Game
          </h3>
          <div className="d-flex col-md-12 flex-row flex-wrap parentDeckCards">
            <Cards selectedCardsByPlayer={this.state.deck} location={"App"} />
          </div>
          <Player
            playersDetails={this.state.playerDetails}
            winner={winnerValue}
            drawCards={this.drawCards}
            resetState={this.state.reset}
            winningSequence={this.state.winningSequence}
            doesWinnerExist={this.state.verifyWinner}
          ></Player>
          <div>
            {winner || (winner === undefined && this.state.reset === true) ? (
              <React.Fragment>
                <h5
                  style={{ color: "indigo", textAlign: "center" }}
                >{`Congratulations Winner is Player: ${winner[0].playerId}!!!`}</h5>
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ textAlign: "center" }}
                    onClick={this.reset}
                  >
                    Lets Play Again!
                  </button>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
