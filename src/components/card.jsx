import React from "react";
import { Trash, Eraser } from "react-bootstrap-icons";

const Card = (props) => {
  const { id, value, onKeyPress, card, onChange, onClick, onDelete, onClear } =
    props;
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <span className="input-group-text">{value}</span>
              <textarea
                autoFocus
                className="form-control"
                onKeyPress={(e) => onKeyPress(e, card)}
                onChange={(e) => onChange(e, card)}
                onClick={() => onClick(card)}
                key={id}
                value={card.textFieldValue}
              ></textarea>
            </div>
          </div>
          <div className="col-1">
            <a className="btn btn-sm btn-inline ms-2">
              <Trash onClick={() => onDelete(card.id)} />
            </a>
            <br></br>
            <a className="btn btn-sm btn-inline ms-2 mt-3">
              <Eraser onClick={() => onClear(card.id)} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
