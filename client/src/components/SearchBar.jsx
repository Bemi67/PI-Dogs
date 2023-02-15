import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByBreed } from "../Redux/breedsActions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length || name.charAt(0) === " ") {
//si no hay nada en el input o un espacio.no hace nada
      return alert("Please insert a valid name.");
    } else {
//si hay algo en el input, hace el dispatch con el valor del input
      dispatch(getByBreed(name)); 
      setName("");
    }
  }

  return (
    <div className="buttonCon">
      <input
        className="breedInput"
        type="text"
        placeholder="Search by breed name"
        value={name}
        onKeyPress={(e) => (e.key === "Enter" ? handleSubmit(e) : null)}
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <button
        type="submit"
        className="subBtn"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        {" "}
        Submit{" "}
      </button>
    </div>
  );
}