
const initialState = {
    countries : [],
    allCountries : []
}




function rootReducer (state=initialState, action) {
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload, // cuando se dispara la accion, me va a llenar los dos estados
                allCountries: action.payload
            }
        case 'FILTER_COUNTRIES_BY_CONTINENT':
            const allCountries = state.allCountries;
            const statusFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.region === action.payload)
            return {
                ...state,
                countries: statusFiltered,
            }
        

            default: return state;

    }
}



export default rootReducer;