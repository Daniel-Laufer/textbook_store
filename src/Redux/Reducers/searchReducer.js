import {HANDLE_SEARCH} from "../actionNames";

export default (state={searchTerm: ''}, action) => {
    switch(action.type){
        case HANDLE_SEARCH:
            return {...state, searchTerm: action.payload}
        default:
            return state
    }
}