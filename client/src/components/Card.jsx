import React from "react";

export default function Card({ id, image, name, temperament, weight }) {

    
      return (
       <div>
                <div>
                   <img src={image} alt="flag"/>
                </div>
                 <div>
                   <h1>Breed Name: {name}</h1>
                 </div>
                <div>
                   <h1>Temperament: {temperament}</h1>
                </div>
                <div>
                  <h1>Weight: {weight}</h1>
                </div>
                {/* <div>
                  <h1>Delete Breed{id}</h1>
                </div> */}
       </div>
      );
    }
   