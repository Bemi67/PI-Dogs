//configuro el store
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
//thunk middleware que permite realizar acciones asyncronicas
import thunk from 'redux-thunk';
import rootReducer from "./breedsReducer";

//al createStore se le pasan siempore 2 parámetros el primero siempre es el reducer
//el segundo varía según la configuración
const store = createStore(rootReducer,
    // una forma permmite que aparezcan las devtools en el navegador
    //compose(
    //     applyMiddleware(thunk),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
//---------------------------------------
// otra forma
    composeWithDevTools (
    applyMiddleware(thunk),
    ))

    export default store;