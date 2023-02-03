import React from "react";

export default function Card({ id, image, name, temperament, weight }) {

    
      return (
       <div>
                <div>
                   <img src={image} alt="flag"/>
                </div>
                 <div>
                   <h4>{name}</h4>
                 </div>
                <div>
                   <h1>{temperament}</h1>
                </div>
                <div>
                  <h1>{weight}</h1>
                </div>
       </div>
      );
    }