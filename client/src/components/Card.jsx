
import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, image, name, temperament, weight }) {
console.log()
  return (
    <div className="allContainer">
      <div className="breedsContainer">
        <div className="breedsCard">
          <div className="breedsImage">
            {image ? (
              <img className="recipe" src={`${image}`} alt="There is no img" />
            ) : (
              <img className="recipe" src="" alt="There is no img" />
            )}
          </div>
          <Link to={`/dogs/${id}`}>
            <h2 className="breedName"> {name} </h2>
         
          <p className="cardTemp"> Temperaments: {temperament} </p>

          <p className="cardW"> Weight: {weight}  Kg </p>
 </Link>
        
        </div>
      </div>
    </div>
  );
}