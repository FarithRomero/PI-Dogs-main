import {GET_ALL_BREEDS, GET_ALL_TEMPERAMENTS, POST_NEWBREED, GET_BY_NAME, ORDER_BREEDS, CLEAR_STATE, GET_BY_DETAIL} from "./action-types.js";
import axios from "axios";

export const getAllBreeds = () => {
    return async function(dispatch){
        try{
            const response = await axios.get('http://localhost:3001/dogs');
            return dispatch({type: GET_ALL_BREEDS, payload: response.data})
        } catch(error){
            alert(error.message)
        }
    }
};

export const postNewBreed = (dog) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/dogs', dog);
            dispatch({ type: POST_NEWBREED, payload: response.data });
            alert("Perro creado correctamente")
            return response;
        } catch (error) {
            alert(error.message)
        }
    };
};

export const clearState = () => {//PENDIENTE POR TERMINAR
    return async function(dispatch){
        try{
            return dispatch({type: CLEAR_STATE})
        } catch(error){
            console.log(error.message)
        }
    }
};

export const getByName = (name) => {
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({type: GET_BY_NAME, payload: response.data})
        } catch(error){
            alert(error.message)
        }
    }
};


export const getAllTemperaments = () => {
    return async function(dispatch){
        try{
            const response = await axios.get('http://localhost:3001/temperaments');
            return dispatch({type: GET_ALL_TEMPERAMENTS, payload: response.data})
        } catch(error){
            alert(error.message)
        }
    }
};


export const getByDetail = (Id) => {
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:3001/dogs/${Id}`);
            return dispatch({type: GET_BY_DETAIL, payload: response.data})
        } catch(error){
            alert(error.message)
        }
    }
};

export  const orderCards = (order) => {
        return { type: ORDER_BREEDS, payload: order };
};




