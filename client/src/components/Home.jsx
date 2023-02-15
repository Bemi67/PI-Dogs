import React,{ useState, useEffect } from "react";
//Hooks
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getBreeds,
  orderBy,
  filterByTemperaments,
  getTemperaments,
  filterByBreed, 
} from "../Redux/breedsActions";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import loading from "../Images/loading.gif";
import "./Home.css";

// renderiza el componente Home
export default function Home() {
  
//permite renderizar las acciones
  const dispatch = useDispatch(); 
//permite usar el estado
  const allBreeds = useSelector((state) => state.breeds); 
//permite usar el estado
  const temperaments = useSelector((state) => state.temperaments); 
//permite ordenar
  const [, setOrder] = useState("All"); 
//permite filtrar por raza
  const [, setBreeds] = useState("All"); 
//permite comenzar en la página 1
  const [currentPage, setCurrentPage] = useState(1); 
//asigno la cantidad de cards por página
  const [breedsPerPage] = useState(8); 
//detrmino la última raza de la página
  const indexOfLastBreed = currentPage * breedsPerPage;
//detrmino la primera raza de la página
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
//determino la cantidad de razas que se muestran por página, slice() toma una porción del arreglo según los parametros que le doy 
  const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed); 
//permite filtrar por temperamento  
  const [temperament, setTemperament] = useState("All"); 

  const pagination = (currentPageNumber) => {
//permite actualizar cuando se cambia de página
    setCurrentPage(currentPageNumber); 
  };
//permite que se ejecute la acción cuando se renderiza la página
  useEffect(() => {
//permite que se actualice cuando cambia de página  
    setCurrentPage(1); 
//ejectuta el estado cuando se actualiza
  }, [allBreeds]); 

  useEffect(() => {
    if (allBreeds.length === 0) {
//trae las razas
      dispatch(getBreeds()); 
//trae los temperamentos
      dispatch(getTemperaments()); 
    }
//ejecuta cuando cambia
  }, [dispatch, allBreeds.length]); 
//permite el ordenamiento
  function handleClick(e) {
//permite que no se recargue la página
    e.preventDefault(); 
    dispatch(getBreeds());
  }
//permite ordenar
  function handleSort(e) {
    dispatch(orderBy(e.target.value));
//permite que cuando cambie de página se actualize 
    setCurrentPage(1); 
//permite que se actualice el estado
    setOrder(e.target.value); 
  }
//permite filtrar por temperamento
  function handleFilterByTemp(e) {
    
    e.preventDefault();
    dispatch(filterByTemperaments(e.target.value));
    setCurrentPage(1);
    setTemperament(e.target.value);
  }

  function handleFilterByBreed(e) {
    e.preventDefault();
    dispatch(filterByBreed(e.target.value));
    setCurrentPage(1);
    setBreeds(e.target.value);
  }

  return (
    <div className="homeDiv">
      <div className="title">
        <h1> Breeds Library</h1>
      </div>
     
        
      {currentBreeds.length === 0 ? (
        <div>
          {<img className="loadingGif" src={loading} alt="Loading..." />}
        </div>
      ) : (
        <div className="CardContainer">
          {currentBreeds?.map((breed) => { //lógica de ternarios
            console.log(breed)
            return (
              <div key={breed.id} >
                <Card
                  id={breed.id}
                  name={breed.name}
                  image={breed.image}
                  temperament={breed.temperament?.join(", ")}
                  weight={breed.weight}
                  height={breed.height}
                />
              </div>
            );
          })}
          
        </div>
      )}
      <div className="buttonCont">
      <div>
        <Link to="/home/form">
          <button className="createButton" type="button">
            Create Breed
          </button>
        </Link>
      </div>
      <div>
      <button
          className="refBtn"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh
        </button>
      </div>

      </div>
      <div className="buttonCont">
      
      <div className="searchBar">
        <SearchBar />
      </div>
     
      <div>
        <select className="sortBy" onChange={(e) => handleSort(e)}>
          <option value="default"> Sort by... </option>
          <option value="az"> A-Z</option>
          <option value="za"> Z-A </option>
          <option value="asc"> Lightest </option>
          <option value="desc"> Heaviest </option>
        </select>
      </div>

      <div>
        <select
          className="filterTemps"
          value={temperament}
          onChange={(e) => handleFilterByTemp(e)}
        >
          <option value="All"> All temperaments </option>
          {temperaments?.map((temp, index) => (
            <option onClick={(e) => handleClick(e)} key={index}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          className="filterBreeds"
          onChange={(e) => {
            handleFilterByBreed(e);
          }}
        >
          <option value="all">All Breeds</option>
          <option value="created">Your created Breeds</option>
          <option value="api"> Library Breeds</option>
        </select>
      </div>
      </div>
      
      <div className="Pagination">
        <Pagination
          breedsPerPage={breedsPerPage}
          allBreeds={allBreeds.length}
          pagination={pagination}
          currentPage={currentPage}
        />
      </div>
      <div>
      <h4>By Bernabé Michel</h4>
      </div>
      </div>
  );
}