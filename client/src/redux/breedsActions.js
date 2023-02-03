import axios from "axios";
export const GET_BREEDS = "GET_BREEDS";
 
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


