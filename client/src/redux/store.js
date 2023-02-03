import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "./breedsReducer";

const store = createStore(rootReducer,
    // una forma
    //compose(
    //     applyMiddleware(thunk),
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
//---------------------------------------
// otra forma
    composeWithDevTools (
    applyMiddleware(thunk),
    ))

    export default store