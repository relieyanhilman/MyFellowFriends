import React, { Fragment } from "react";
import "./card.css";
const Card = ({ id, name, email, image }) => {
  return (
    <>
      <div className="tc bg-light-green dib br3 pa3 ma2 bw2 grow shadow-3 shadow-hover">
        <img alt="robots" src={image} />
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
