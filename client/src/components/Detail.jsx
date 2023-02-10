import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,  useParams } from "react-router-dom";
import { getBreedsDetails, clean } from "../Redux/breedsActions";
import loading from "../Images/loading.gif";
import "./Detail.css";

export default function Details() {
  const dispatch = useDispatch(); //para poder usar las acciones
  let breedsDetail = useSelector((state) => state.breedsDetails); // para poder usar el estado
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getBreedsDetails(id));
    dispatch(clean());
  }, [dispatch, id]);

  return (
    <div className="background">
      <div className="detailsCss">
        
        {breedsDetail.length === 0 ? (
          <img src={loading} alt="Loading..." />
        ) : (
          <div className="detailsContainer">
            <div>
              <h2> {breedsDetail.name} </h2>
              <div className="img">
                <img src={breedsDetail.image ? breedsDetail.image : loading} alt="Loading..." />
              </div>
              {breedsDetail.temperament ? <p> <b>Temperaments: </b> {breedsDetail.temperament.join(", ")}</p> : null}
              <div className="weightCss">
                <p> Weight: {breedsDetail.weight} Kg</p>
              </div>
              <p className="heightCss"> Height: {breedsDetail.height} cm </p>
              <p className="lifeSpanCss"> Life Span: {breedsDetail.life_span} </p>
            </div>
            <Link to="/home">
              <button> Back </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}