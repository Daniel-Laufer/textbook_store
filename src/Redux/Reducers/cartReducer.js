import { GET_CART_ITEMS } from "../actionNames.js";

export default (
  state = {
    allCartItems: [],
    // cartItemsToDisplay: [],
    pending: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_CART_ITEMS + "_FULFILLED":
      return {
        ...state,
        pending: false,
        allCartItems: action.payload,
        // cartItemsToDisplay: action.payload,
      };
    case GET_CART_ITEMS + "_PENDING":
      return { ...state, pending: true };
    case GET_CART_ITEMS + "_REJECTED":
      return {
        ...state,
        pending: false,
        error: action.payload,
        allCartItems: [],
      };
    //     case SEARCH_AND_UPDATE_TEXTBOOKS:
    //       const newItems = [];
    //       for (let key in state.allTextbooks) {
    //         if (
    //           state.allTextbooks[key].title
    //             .toLowerCase()
    //             .includes(action.payload.toLowerCase())
    //         )
    //           newItems.push(state.allTextbooks[key]);
    //       }
    //       return { ...state, textbooksToDisplay: [...newItems] };
    default:
      return state;
  }
};
