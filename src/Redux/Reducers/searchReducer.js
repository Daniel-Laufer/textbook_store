import {UPDATE_FILTERS, UPDATE_SEARCH} from "../actionNames";

export default (state={searchTerm: '', filters: {}}, action) => {
    switch(action.type){
        case UPDATE_SEARCH:
            return {...state, searchTerm: action.payload}
        case UPDATE_FILTERS:
            return {...state, filters: {...action.payload}}
        default:
            return state
    }
}