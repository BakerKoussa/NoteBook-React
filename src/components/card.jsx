import React from "react";

const Card = (props) => {
  const { id, value, onKeyPress, card, onChange, onClick } = props;
  return (
    <div className="card">
      <div className="card-body">
        <div className="input-group">
          <span className="input-group-text">{value}</span>
          <textarea
            autoFocus
            className="form-control"
            onKeyPress={(e) => onKeyPress(e, card)}
            onChange={(e) => onChange(e, card)}
            onClick={(e) => onClick(card)}
            key={id}
            value={card.textFieldValue}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Card;
