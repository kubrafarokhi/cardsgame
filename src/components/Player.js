import React from "react";
import "./Player.css";
import Cards from "./Cards";

class Player extends React.Component {
  state = {
    currentActivePlayerId: 1
  };
  drawCardsPlayer = playerid => {
    let deactivePlayer = playerid === 1 ? 2 : 1;
    this.setState({
      currentActivePlayerId: deactivePlayer
    });
    this.props.drawCards(playerid);
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentActivePlayerId !== prevState.currentActivePlayerId) {
      this.setState({
        currentInActivePlayerId: this.state.currentActivePlayerId
      });
    }
  }

  renderAllPlayers(players) {
    if (players.length > 0) {
      return players.map((player, index) => {
        return (
          <div key={index} className="d-flex flex-row  m-3 h-auto player">
            <div className="d-flex flex-row align-items-center">
              <span
                style={{ color: "indigo" }}
              >{`Player:${player.playerId}`}</span>
              {!player.winner && !this.props.doesWinnerExist && (
                <button
                  type="button"
                  disabled={
                    this.state.currentActivePlayerId !== player.playerId
                      ? true
                      : false
                  }
                  className="btn btn-primary m-2"
                  onClick={() => this.drawCardsPlayer(player.playerId)}
                >
                  Draw
                </button>
              )}
            </div>

            <div className="col-md-10 selectedCards d-flex">
              <Cards
                selectedCardsByPlayer={player.selectedCardsByPlayer}
                winningSequence={this.props.winningSequence}
              />
            </div>
          </div>
        );
      });
    } else return [];
  }

  render() {
    const playersArray = this.props.playersDetails;
    return (
      <div className="col-md-12">{this.renderAllPlayers(playersArray)}</div>
    );
  }
}
export default Player;
