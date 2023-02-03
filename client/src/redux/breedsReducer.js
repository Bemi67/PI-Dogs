
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
            
        }
    default: 
    return state
   }
}