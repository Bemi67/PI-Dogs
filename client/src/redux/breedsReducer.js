
let initialState = {
  breeds: [],
  filtered: [],
  breedDetails: [],
  temperaments: [],

}

export default function rootReducer(state = initialState, action){
   switch(action.type) {
    case "GET_BREEDS":
        return {
            ...state,
            breeds: action.payload,
            
    };
 
    case "GET_TEMPERAMENTS":
    return {
      ...state,
      temperaments: action.payload,
    };

    case "GET_BREED_DETAILS":
        return {
          ...state,
          breedsDetails: action.payload,
    } ;

    case "GET_BY_BREED":
      return {
        ...state,
        breeds: action.payload,
    };

    case "ORDER_BY":
        if (action.payload === "default") {
        
          return {
            ...state,
            breedss: state.breedss, 
          };
        }
        if (action.payload === "az") {
          
          return {
            ...state,
            breeds: state.breeds.sort(function (a, b) {
              
              if (a.name > b.name) {
                
                return 1; 
              }
              if (b.name > a.name) {
                
                return -1; 
              }
              return 0;
            }),
          }
        }
        if (action.payload === "za") {
          return {
            ...state,
            breeds: state.breeds.sort(function (a, b) {
              if (a.name > b.name) {
                return -1
              }
              if (b.name > a.name) {
                return 1
              }
              return 0
            }),
          };
        }
        if (action.payload === "asc") {
          return {
            ...state,
            breeds: state.breeds.sort(function (a, b) {
              if (a.weight > b.weight) {
                return 1;
              }
              if (b.weight > a.weight) {
                return -1;
              }
              return 0;
            }),
          }
        }
        if (action.payload === "desc") {
          return {
            ...state,
            breeds: state.breeds.sort(function (a, b) {
              if (a.weight > b.weight) {
                return -1;
              }
              if (b.weight > a.weight) {
                return 1;
              }
              return 0;
            }),
          }
        } else {
          return {
            ...state,
          }
    } ; 

    case "FILTER_BY_TEMPERAMENTS":
          const allBreeds = state.filtered; 
          const temperamentFilter =
            action.payload === "All"
              ? allBreeds
              : allBreeds.filter((e) => e.temperaments?.includes(action.payload));
          return {
            ...state,
            breeds: temperamentFilter,
    };

    case "FILTER_BY_BREED":
      if (action.payload === "created") {
        if (
          state.filtered.filter((i) => typeof i.id === "string")
            .length === 0
        ) {
          return alert("No Breed");
        }
        return {
          ...state,
          breeds: state.filtered?.filter((i) => typeof i.id === "string"),
        }
      } else {
        return {
          ...state,
          breeds: state.filtered.filter((i) => typeof i.id === "number"),
        }
    };

    case "CLEAN":
      return {
        ...state,
        breedsDetails: [],
    };

    case "CREATE_BREED":
        return {
          ...state, // retorna el estado inicial
    };

    case "DELETE_BREED":
      return{
        ...state,
        filtered: state.filtered.filter((breed) => breed.id !== action.payload)
    };
     
    default: 
    return state
   }
}