import axios from "axios";
export const GET_BREEDS = "GET_BREEDS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_BREED_DETAILS = "GET_BREED_DETAILS";
export const GET_BY_BREED = "GET_BY_BREED";
export const ORDER_BY = "ORDER_BY";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_BREED = "FILTER_BY_BREED";
export const CLEAN = "CLEAN";
export const CREATE_BREED = "CREATE_BREED";
export const DELETE_BREED = "DELETE_BREED";
 
export function getBreeds() {
    return async function (dispatch) {
      try {
        var pedidoApi = await axios.get("http://localhost:3001/dogs");
        return dispatch({
          type: GET_BREEDS,
          payload: pedidoApi.data,
        });
      } catch (error) {
        alert(error);
      }
    };
  }

  export function getTemperaments() {
    return async function (dispatch) {
      try {
        var pedidoApi = await axios.get("http://localhost:3001/temperaments");
        return dispatch({
          type: GET_TEMPERAMENTS,
          payload: pedidoApi.data,
        });
      } catch (error) {
        alert(error);
      }
    };
  }

  export function getBreedDetails(id) {
    console.log(id);
    return async function (dispatch) {
      try {
        var pedidoApi = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({
          type: GET_BREED_DETAILS,
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
        var pedidoApi = await axios.get(`http://localhost:3001/dogs?name=${payload}`); //esto lo que hace es buscar por nombre
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

  export function clean() {
    return {
      type: CLEAN,
    };
  }

  export function createBreed(payload) {
    return async function (dispatch) {
      try {
        await axios.post("http://localhost:3001/create", payload);
        return dispatch({
          type: CREATE_BREED,
        });
      } catch (error) {
        alert("Post failed");
      }
    };
  }
  
   
  
  export function deleteBreed(id){
    return async function(dispatch){
      try{
        const breedToDelete = await axios.delete(`http://localhost:3001/delete/${id}`)
        return dispatch ({
          type: DELETE_BREED,
          payload: breedToDelete,
        });
      }catch(error){
        alert(error)
      }
    };
  };

