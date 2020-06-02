import { GET_TEXTBOOKS } from "../actionNames.js";

export default (state={textbooks: []}, action) => {
    switch(action.type){
        case GET_TEXTBOOKS + "_FULFILLED":
            return {...state, textbooks:[...action.payload]}
        default:
            return state
    }
}





// import {FETCH_TEXTBOOKS_PENDING,
//     FETCH_TEXTBOOKS_SUCCESS,
//     FETCH_TEXTBOOKS_ERROR} from "../actionNames";



// export const getTextbooksReducer = (state={textbooks:[], pending: false, error: null}, action) => {
//     switch(action.type) {
//         case FETCH_TEXTBOOKS_PENDING: 
//             return {
//                 ...state,
//                 pending: true
//             }
//         case FETCH_TEXTBOOKS_SUCCESS:
//             return {
//                 ...state,
//                 pending: false,
//                 textbooks: action.payload
//             }
//         case FETCH_TEXTBOOKS_ERROR:
//             return {
//                 ...state,
//                 pending: false,
//                 error: action.error
//             }
//         default: 
//             return state;
//     }
// }

