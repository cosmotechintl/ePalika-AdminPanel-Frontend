import React from "react";
import "./Card.scss";
const Card = ({ icon, title }) => {
  return (
    <div className="cardContainer">
      <div className="card">
        <span className="icon">{icon}</span>
        <span className="title">{title}</span>
      </div>
    </div>
  );
};

export default Card;
