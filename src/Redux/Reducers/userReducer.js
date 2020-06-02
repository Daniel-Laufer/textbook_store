import {LOGIN, SET_AGE} from "../actionNames";


export default (state={loggedIn: false, age: 18, name: "Daniel"}, action) => {
    switch(action.type){
        case LOGIN:
            return {...state, loggedIn:!state.loggedIn}
        case SET_AGE:
            return {...state, age: action.payload}
        default:
            return state
    }
}