
const initialState = {
    countries : [],
    allCountries : [],
    activities : [],
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
        case 'ORDER_BY_NAME':
                const sortedArr = action.payload === 'asc' ?
                state.countries.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function(a, b) {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    countries: sortedArr
                }
        case 'GET_NAME_COUNTRIES':
                return {
                    ...state,
                    countries: action.payload
                }
        case 'POST_ACTIVITY':
                return {
                    ...state,
                }
        case 'GET_ACTIVITIES':
                return {
                    ...state,
                    activities: action.payload
                }
        case 'FILTER_BY_POPULATION':
            const filterPopulation = action.payload === 'ascpop' ?
            state.countries.sort(function(a, b) {
                if(a.population > b.population) {
                    return 1;
                }
                if(b.population > a.population) {
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort(function(a, b) {
                if(a.population > b.population) {
                    return -1;
                }
                if(b.population > a.population) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                countries: filterPopulation
            }

            default: return state;
    }
}



export default rootReducer;