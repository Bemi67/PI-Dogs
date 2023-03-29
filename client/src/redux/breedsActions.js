//Las acciones asíncronas en Redux se caracterizan por ser un objeto de JavaScript,
//que retorna un tipo de acción, por el que será identificada y que definirá posteriormente 
//en el reducer el modo en el que modificará el state así como la información que trae, 
//en un espacio llamado payload.
import axios from "axios";
//trae todas las razas
export const GET_BREEDS = "GET_BREEDS"; 
//trae todos los temperamentos
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
//trae el detalle de la raza
export const GET_BREEDS_DETAILS = "GET_BREEDS_DETAILS"; 
//trae raza por nombre
export const GET_BY_BREED = "GET_BY_BREED";
//ordena de la A-Z,Z-A, mas pesado y más liviano
export const ORDER_BY = "ORDER_BY";
//filtra por temperamento
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
//flitra por razas creadas/api/todas
export const FILTER_BY_BREED = "FILTER_BY_BREED";
//crea una raza
export const CREATE_BREED = "CREATE_BREEDS";
export const CLEAN = "CLEAN";


export function getBreeds() {
  return async function (dispatch) {
    try {
      var pedidoApi = await axios.get("/dogs");
      return dispatch({
        type: GET_BREEDS,
//esto es lo que devuelve la accion
        payload: pedidoApi.data,
      });
    } catch (error) {
      alert(error);
    }
  };
}


export function getTemperaments() {
  return async function (dispatch) {
//devuelve un array de temperamentos
    var pedidoApi = await axios.get("/temperaments", {}); 
    return dispatch({
      type: GET_TEMPERAMENTS, 
      payload: pedidoApi.data, 
    });
  };
}

export function getBreedsDetails(id) {
  console.log(id);
  return async function (dispatch) {
    try {
      var pedidoApi = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: GET_BREEDS_DETAILS,
//despacha la info conseguida
        payload: pedidoApi.data[0] || pedidoApi.data, 
      });
    } catch (error) {
      alert(error);
    }
  };
}

export function getByBreed(payload) {
  return async function (dispatch) {
    try {
//contecta con la ruta que busca por nombre de la raza
      var pedidoApi = await axios.get(`/dogs?name=${payload}`); 
      return dispatch({
        type: GET_BY_BREED,
        payload: pedidoApi.data,
      });
    } catch (error) {
      alert("Breed not found");
    }
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}

export function filterByTemperaments(payload) {
  return function (dispatch) {
    console.log(payload);
    dispatch({ type: FILTER_BY_TEMPERAMENTS, payload });
  };
}

export function filterByBreed(payload) {
  return {
    type: FILTER_BY_BREED,
    payload,
  };
}

export function createBreed(payload) {
  return async function (dispatch) {
    try {
      await axios.post("/create", payload);
      return dispatch({
        type: CREATE_BREED,
      });
    } catch (error) {
      alert("Post failed");
    }
  };
}

export function clean() {
  return {
    type: CLEAN,
  };
}