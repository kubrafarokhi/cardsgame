import React from "react";

const renderSelectedCards = ({
  selectedCardsByPlayer,
  winningSequence,
  location
}) => {
  if (selectedCardsByPlayer.length > 0) {
    return selectedCardsByPlayer.map((deck, index) => {
      let addHighlightClass = "";
      if (!location && winningSequence.length === 4) {
        addHighlightClass =
          winningSequence && winningSequence.includes(deck)
            ? "addHighlightClass"
            : "";
      }

      return (
        <div key={index} className="card-deck d-flex-row">
          <div className="card">
            <div className={`card-body p-3 ${addHighlightClass}`}>
              <p className="card-title">{deck}</p>
            </div>
          </div>
        </div>
      );
    });
  } else return [];
};
const Cards = props => {
  return <React.Fragment>{renderSelectedCards(props)}</React.Fragment>;
};
export default Cards;
