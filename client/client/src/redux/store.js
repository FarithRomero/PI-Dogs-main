import {createStore, applyMiddleware, compose} from 'redux';
import reducer from "./reducer.js";
import thunkMiddleware  from 'redux-thunk';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose; //conecta con la extensión del navegadors

const store = createStore( 
    reducer, 
    composeEnhancer(applyMiddleware(thunkMiddleware))// esta linea es para hacer llamadas asincronas, para poder hacer peticiones a un servidor
)

export default store;