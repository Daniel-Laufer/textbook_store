import {INCREMENT} from "../actionNames";

export default (state={count: 1}, action) => {
    switch(action.type){
        case INCREMENT:
            return {...state, count:state.count+action.amount}
        default:
            return state
    }
}