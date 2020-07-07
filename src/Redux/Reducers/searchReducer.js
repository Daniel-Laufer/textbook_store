import {UPDATE_FILTERS, UPDATE_SEARCH} from "../actionNames";

export default (state={searchTerm: '', filters: {course: null, campus: null, coursePrefix: null}}, action) => {
    switch(action.type){
        case UPDATE_SEARCH:
            return {...state, searchTerm: action.payload}
        case UPDATE_FILTERS:
            // if(!filters.coursePrefix)
            //     filters.course = null;
            return {...state, filters: {...action.payload}}
        default:
            return state
    }
}