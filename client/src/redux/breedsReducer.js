import {
  GET_BREEDS,
  GET_BY_BREED,
  GET_BREEDS_DETAILS,
  ORDER_BY,
  FILTER_BY_TEMPERAMENTS,
  GET_TEMPERAMENTS,
  FILTER_BY_BREED,
  CREATE_BREED,
  CLEAN,
  } from "./breedsActions";

const initialState = {
  breeds: [],
  filtered: [],
  breedsDetails: [],
  temperaments: [],
};

var average = function(string) {
  var str = string;
  var arr = str.split(" - ");
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += parseInt(arr[i]);
  }
  return sum / arr.length;
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        breeds: action.payload,
        filtered: action.payload,
      };

    case GET_BY_BREED:
      return {
        ...state,
        breeds: action.payload,
      };
      
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case GET_BREEDS_DETAILS:
      return {
        ...state,
        breedsDetails: action.payload,
      };
    case CLEAN:
      return {
        ...state,
        breedsDetails: [],
      };
    
    
    case ORDER_BY:
      if (action.payload === "default") {
        // si el payload es default, entonces que me devuelva el estado inicial
        return {
          ...state,
          breeds: state.breeds, // esto es lo que me devuelve la action
        };
      }
      if (action.payload === "az") {
        // si el payload es az, entonces que me devuelva el estado inicial
        return {
          ...state,
          breeds: state.breeds.sort(function (a, b) {
            // ordena de la A a la Z
            if (a.name > b.name) {
              // si el nombre de a es mayor que el de b
              return 1; // entonces que me devuelva 1 para que se ordene de la A a la Z
            }
            if (b.name > a.name) {
              // si el nombre de b es mayor que el de a
              return -1; // tiene que devolver -1  para que se ordene de la Z a la A
            }
            return 0;
          }),
        };
      }
      if (action.payload === "za") {
        return {
          ...state,
          breeds: state.breeds.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "asc") {
        
        return {
          
          ...state,
          breeds: state.breeds.sort(function (a, b) {
          
            if (average(a.weight) > average(b.weight)) {
              return 1;
            }
            if (average(b.weight) > average(a.weight)) {
              return -1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "desc") {
        return {
          ...state,
          breeds: state.breeds.sort(function (a, b) {
            if (average(a.weight) > average(b.weight)) {
              return -1;
            }
            if (average(b.weight) > average(a.weight)) {
              return 1;
            }
            return 0;
          }),
        };
      } else {
        return {
          ...state,
        };
      }

    case FILTER_BY_TEMPERAMENTS:
      const allBreeds = state.filtered; // acabo de crear una variable que contiene a todos los perros
      const temperamentFilter =
        action.payload === "All"
          ? allBreeds
          : allBreeds.filter((e) => e.temperament?.includes(action.payload)); // si el payload es igual a all, entonces que me devuelva todos los perros, sino que me devuelva los perros que incluyan el temperament que le estoy pasando por el payload
      return {
        ...state,
        breeds: temperamentFilter,
      };
   

    case FILTER_BY_BREED:
      if (action.payload === "created") {
        if (
          state.filtered.filter((item) => typeof item.id === "string")
            .length === 0
        ) {
          return alert("no breed");
        }
        return {
          ...state,
          breeds: state.filtered?.filter((item) => typeof item.id === "string"),
        };
      } else {
        return {
          ...state,
          breeds: state.filtered.filter((item) => typeof item.id === "number"),
        };
      }
   
    case CREATE_BREED:
      return {
        ...state,
        ...action.payload 
      };
      // si no es ninguna de las anteriores, entonces que me devuelva el estado inicial
    default: 
    // aca me devuelve el estado inicial
      return { ...state }; 
  }
}