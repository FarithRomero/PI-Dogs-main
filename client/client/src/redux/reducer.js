import { GET_ALL_BREEDS, GET_ALL_TEMPERAMENTS, CLEAR_STATE, GET_BY_NAME, GET_BY_DETAIL, POST_NEWBREED, ORDER_ALPHABETIC, ORDER_BY_WEIGHT, FILTER_TEMPERAMENT, FILTER_ORIGIN} from './action-types.js'; 

const initialState = {
    breeds: [],
    breedDetail: {},
    temperaments: [],
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
                breeds: [],
                copyBreeds: [],
                breedDetail: {},  
                temperaments: [],
                alphabeticOrder: [],
                responsePostBree: []
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
        case ORDER_ALPHABETIC:
            const disorderBreeds = [...state.breeds]
            return {
                ...state,
                alphabeticOrder: action.payload === "Ascendente"? disorderBreeds.sort((a, b) => a.id - b.id) : disorderBreeds.sort((a, b) => b.id - a.id),
            } 
        case  ORDER_BY_WEIGHT:
            let orderData;
            if (action.payload === "Peso menor") {
                const ordenarPorPesos = (disorderWeight) => {
                    return disorderWeight.slice().sort((a, b) => {
                        const pesoA = parseInt(a.Peso.split(" - ")[0]);
                        const pesoB = parseInt(b.Peso.split(" - ")[0]);
                        return pesoA - pesoB;
                    });
                };
                orderData = ordenarPorPesos([...state.breeds]);
            } else if (action.payload === "Peso mayor") {
                orderData = [...state.breeds].slice().sort((a, b) => {
                    const pesoA = parseInt(a.Peso.split(" - ")[0]);
                    const pesoB = parseInt(b.Peso.split(" - ")[0]);
                    return pesoB - pesoA;
                });
            }
            return{
                ...state,
                weightOrder :  orderData,
            }
        case  FILTER_TEMPERAMENT:   
            let temperamentsToFilter = [...state.breeds];
            return{
                ...state,
                temperamentsFilter : temperamentsToFilter.filter(item => {return item.Temperamentos && item.Temperamentos.includes (action.payload)}),   
            }
        case  FILTER_ORIGIN:
         let filtro =   [...state.breeds].filter((breed) => breed.Origen === action.payload)
            return{
                ...state,
                originFilter : filtro,  
            }
        default:    
            return {...state}
    }
};

export default reducer;

 