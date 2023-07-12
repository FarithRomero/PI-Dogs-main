import {GET_ALL_BREEDS, GET_ALL_TEMPERAMENTS} from './action-types.js'; 

const initialState = {
    breeds: [],
    breedDetail: {},
    temperaments: [],
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case  GET_ALL_BREEDS:
            return {
                ...state,
                breeds: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        default:    
            return {...state}
    }
};

export default reducer;