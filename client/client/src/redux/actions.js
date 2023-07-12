import {GET_ALL_BREEDS, GET_ALL_TEMPERAMENTS, POST_NEWBREED, FILTER_BREEDS, ORDER_BREEDS} from "./action-types.js";
import axios from "axios";

export const getAllBreeds = () => {
    return async function(dispatch){
        try{
            const response = await axios.get('http://localhost:3001/dogs');
            return dispatch({type: GET_ALL_BREEDS, payload: response.data})
        } catch(error){
            console.log(error.message)
        }
    }
};

const getAllTemperaments = () => {
    return async function(dispatch){
        try{
            const response = await axios.get('http://localhost:3001/temperaments');
            return dispatch({type: GET_ALL_TEMPERAMENTS, payload: response.data})
        } catch(error){
            console.log(error.message)
        }
    }
};