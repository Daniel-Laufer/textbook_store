import { GET_TEXTBOOKS,SEARCH_AND_UPDATE_TEXTBOOKS } from "../actionNames.js";
import axios from "axios";

export const getTextbooks = () => {
  return {
    type: GET_TEXTBOOKS,
    payload: axios.get("/textbooks").then(res => res.data)
  };
};


export const searchAndUpdateTextbooks = (searchTerm) => {
  return{
    type: SEARCH_AND_UPDATE_TEXTBOOKS,
    payload: searchTerm

  }
}

// import {FETCH_TEXTBOOKS_PENDING,
// FETCH_TEXTBOOKS_SUCCESS,
// FETCH_TEXTBOOKS_ERROR} from "../actionNames";

// function fetchTextbooksPending() {
//     return {
//         type: FETCH_TEXTBOOKS_PENDING
//     }
// }

// function fetchTextbooksSuccess(textbooks) {
//     return {
//         type: FETCH_TEXTBOOKS_SUCCESS,
//         textbooks
//     }
// }

// function fetchTextbooksError(error) {
//     return {
//         type: FETCH_TEXTBOOKS_ERROR,
//         error
//     }
// }

// export const getTextbooks = () => {

//     return dispatch => {
//         dispatch(fetchTextbooksPending())
//         axios.get("/textbooks")
//         .then(res =>
//             {
//                 console.log(res.data)
//                 dispatch(fetchTextbooksSuccess(res.data))
//                 return res.data
//             }
//         )
//         .catch(error => {
//             dispatch(fetchTextbooksError(error));
//         })
//     }
// }
