import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getBreeds } from "../Redux/breedsActions";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Form.css";

//form--> 
//completamos ---> le realizamos cambios ---> una fc para escribir handleChange, validamos antes de enviar
//entregamos ---> lo enviamos a quien corresponda para que se encargue(backend) ---> una fc para enviarlo handleSubmit
//handle reciben eventos

const Form = () => {
//para poder usar el estado.
  const tempForm = useSelector((state) => state.temperaments);
//para poder usar las acciones.
  const dispatch = useDispatch(); 
  const [create, setCreate] = useState(false);
  const initialState = {
    name: "",
    heightmin: "",
    heightmax: "",
    weightmin: "",
    weightmax: "",
    life_spanmin: "",
    life_spanmax: "",
    temperaments: [],
    image: "",
  };
  const [errors, setErrors] = useState({ form: "complete form" });
  const [completed, setCompleted] = useState(initialState);
  const history = useHistory(); 

  const finalForm = {
    name: completed.name,
    height: `${completed.heightmin} - ${completed.heightmax}`,
    weight: `${completed.weightmin} - ${completed.weightmax}`,
    life_span: `${completed.life_spanmin} - ${completed.life_spanmax} years`,
    temperament: completed.temperaments.map((item) => item.id),
    image: completed.image,
  };

  useEffect(() => {
    if (tempForm.length === 0) return dispatch(getTemperaments());
  }, [tempForm.length, dispatch]);
//para validar los datos
  const validate = (completed) => {
    let errors = {};
    if (!completed.name) {
      errors.name = "Breed name is required";
    }
    if (completed.name.length < 3) {
      errors.name = "Breed name must have at least 3 characters";
    }
    if (!completed.heightmin || !completed.heightmax) {
      errors.height = "Breed height is required";
    }
    if (parseInt(completed.heightmax) <= parseInt(completed.heightmin)) {
      errors.height = "Height-max must be highter than height-min";
    }
    if (!completed.weightmin || !completed.weightmax) {
      errors.weight = "Breed weight is required";
    }
    if (parseInt(completed.weightmax) <= parseInt(completed.weightmin)) {
      errors.weight = "Weight-max must be highter than weight-min";
    }
    if (!completed.life_spanmin || !completed.life_spanmax) {
      errors.life_span = "Breed life span is required";
    }
    if (parseInt(completed.life_spanmax) <= parseInt(completed.life_spanmin)) {
      errors.life_span = "Life span-max must be highter than life span-min";
    }
    if (completed.temperaments.length === 0) {
      errors.temperaments = "A temperament or temperaments are required";
    }
    if (completed.life_spanmax < 0 || completed.life_spanmin < 0) {
      errors.life_span = "Value must be highter than 0";
    }
    if (completed.weightmax < 0 || completed.weightmin < 0) {
      errors.weight = "Value must be highter than 0";
    }
    if (completed.heightmax < 0 || completed.heightmin < 0) {
      errors.height = "Value must be highter than 0";
    }

    return errors;
  };

  const handleChange = (e) => {
//target es el evento que ha sido modificado, name hace referencia al nombre del input
    setCompleted({ ...completed, [e.target.name]: e.target.value });
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
  };
// la hago por aparte xq es más fácil manejarla así x ser un array
  const handleTemperaments = (e) => {
    if (
      !completed.temperaments.includes(
        tempForm.find((item) => item.name === e.target.value)
      )
    ) {
      completed.temperaments.push(
        tempForm.find((item) => item.name === e.target.value)
      );
    }
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    console.log(e.target.value)
    console.log(finalForm)
    e.preventDefault();
    setErrors(
      validate({
        ...completed,
        [e.target.name]: e.target.value,
      })
    );
    if (Object.values(errors).length === 0) {
      axios.post("http://localhost:3001/create", finalForm);
      setCreate(!create);
      setCompleted(initialState);
      alert("Breed created successfully"); 
      history.push("/home"); 
      dispatch(getBreeds());
    } else {
      alert("Please fill all the fields");
    }
  };

  function handleDelete(name) {
    setCompleted({
      ...completed,
      temperaments: completed.temperaments.filter((item) => item.name !== name),
    });
  }

  return (
    <div className="backgroundForm">
      <div>
        <div className="formCss">
          <div className="formTitle">
            <h1>Breed Creation Panel</h1>
          </div>
{/* <form permite usar otras etiquetas como label y inpunt> */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <label> Name: </label>
{/* input tiene 3 valores primcipales
name permite reconocer el evento, que es lo que ocurre 
value el valor que se puso dentro del campo   
onChange modifica el formulario en el estado local */}
            <input
              type="text"
              name="name"
              value={completed.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}

            <div className="lifeSpan">
              <p>
                <label> Life span (years): </label>
                <input
                  className="inputLife"
                  type="number"
                  min="1"
                  max="25"
                  name="life_spanmin"
                  placeholder="Min"
                  value={completed.life_spanmin}
                  onChange={(e) => handleChange(e)}
                />

                <input
                  className="inputLife"
                  type="number"
                  min="1"
                  max="25"
                  name="life_spanmax"
                  placeholder="Max"
                  value={completed.life_spanmax}
                  onChange={(e) => handleChange(e)}
                />
              </p>
              <p>
                {errors.life_span ? <label>{errors.life_span}</label> : null}
              </p>
            </div>

            <p>
              <label> Weight (Kg): </label>
              <input
                type="number"
                name="weightmin"
                min="1"
                placeholder="Min"
                value={completed.weightmin}
                onChange={(e) => handleChange(e)}
              />

              <input
                type="number"
                name="weightmax"
                max="90"
                placeholder="Max"
                value={completed.weightmax}
                onChange={(e) => handleChange(e)}
              />
            </p>
            <p>{errors.weight ? <label>{errors.weight}</label> : null}</p>

            <p>
              <label> Height (cm): </label>
              <input
                type="number"
                name="heightmin"
                min="10"
                placeholder="Min"
                value={completed.heightmin}
                onChange={(e) => handleChange(e)}
              />

              <input
                type="number"
                name="heightmax"
                min="11"
                max="85"
                placeholder="Max"
                value={completed.heightmax}
                onChange={(e) => handleChange(e)}
              />
            </p>
            <p>{errors.height ? <label>{errors.height}</label> : null}</p>

            <label> Image: </label>
            <input
              className="inputImg"
              type="url"
              name="image"
              value={completed.image}
              onChange={(e) => handleChange(e)}
            />

            <div>
              <label> Temperaments: </label>
{/* select recibe className value y on change con el handletemperametns especial */}
              <select
                className="inputTemp"
                value= {completed.temperaments}
                onChange={(e) => handleTemperaments(e)}
              >
{/* option permite renderizar los valores por cada temperamento */}
                <option>All Temperaments</option>
                {tempForm?.map((el) => (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
              <p>
                {errors.temperaments ? (
                  <label>{errors.temperaments}</label>
                ) : null}
              </p>
            </div>

            <div className="temp">
              {completed.temperaments?.map((item) => (
                <div key={item.id}>
                   {item.name}{" "}
                  <button onClick={() => handleDelete(item.name)}>x</button>
                </div>
              ))}
            </div>
            <Link to="/home">
              <button className="BackButton">
                <p> Back </p>
              </button>
            </Link>
            <button className="submitButton" type="submit">
{/* como esta dentro del formulario no le ponemos el onSubmit */}
              <p> Submit </p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;