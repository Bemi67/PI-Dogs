//importo las acciones
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
  //guarda los filtros aplicados
  filtered: [],
  breedsDetails: [],
  temperaments: [],
};

//esta función la hice para poder separar los datos que vienen en un string de peso y altura
//para luego poder sacar un promedio entre el valor inferior y el superior,
//que permitirá el ordenamiento
var average = function(string) {
  var str = string;
  var arr = str.split(" - ");
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += parseInt(arr[i]);
  }
  return sum / arr.length;
}
//recibe un estado (es el inicial) y una acción
export default function rootReducer(state = initialState, action) {
//switch evalua/se fija en el tipo de acción que se recibe
  switch (action.type) {
// en caso de recibir esta acción le indico que hacer   
    case GET_BREEDS:
      return {
//agrego la copia de todo lo que hay en el estado
        ...state,
//aplicamos la lógica deseada en este caso guardo las razas que vienen en el payload (un array de objetos)
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
// esto es lo que me devuelve la action          
          breeds: state.breeds, 
        };
      }
      if (action.payload === "az") {
// si el payload es az, entonces que me devuelva el estado inicial
        return {
          ...state,
// ordena de la A a la Z
          breeds: state.breeds.sort(function (a, b) {
// si el nombre de a es mayor que el de b
            if (a.name > b.name) {
// entonces que me devuelva 1 para que se ordene de la A a la Z
              return 1; 
            }
// si el nombre de b es mayor que el de a            
            if (b.name > a.name) {
 // tiene que devolver -1  para que se ordene de la Z a la A             
              return -1;
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
//crea una variable que contiene a todas las razas
      const allBreeds = state.filtered; 
      const temperamentFilter =
// si el payload es igual a all, entonces que me devuelva todos los perros, sino que me devuelva
// los perros que incluyan el temperament que le estoy pasando por el payload
        action.payload === "All"
          ? allBreeds
          : allBreeds.filter((e) => e.temperament?.includes(action.payload)); 
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