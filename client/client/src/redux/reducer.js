import { GET_ALL_BREEDS, GET_ALL_TEMPERAMENTS, CLEAR_STATE, GET_BY_NAME, GET_BY_DETAIL, POST_NEWBREED, ORDER_BREEDS} from './action-types.js'; 

const initialState = {
    breeds: [],
    breedDetail: {},
    temperaments: [],
    orderBreeds: [],
    responsePostBree: []
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case  GET_ALL_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                copyBreeds: action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case CLEAR_STATE:
            return {
                ...state,
                breedDetail: {}
            }
        case GET_BY_NAME:
                return {
                    ...state,
                    copyBreeds: action.payload 
                }
        case GET_BY_DETAIL:
                return {
                    ...state,
                    copyBreeds: action.payload
                }
        case POST_NEWBREED:
                return{
                    ...state,
                    responsePostBree: [...state.responsePostBree, action.payload]
                }
        case ORDER_BREEDS:
                const disorderBreeds = [...state.breeds]
                return {
                    ...state,
                    orderBreeds: action.payload === "Ascendente"? disorderBreeds.sort((a, b) => a.id - b.id) : disorderBreeds.sort((a, b) => b.id - a.id),

                }   
        default:    
            return {...state}
    }
};

export default reducer;