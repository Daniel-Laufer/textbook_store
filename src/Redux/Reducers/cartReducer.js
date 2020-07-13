import {
  GET_CART_ITEMS,
  ADD_TO_CART,
  DELETE_FROM_CART,
  RESET_CART,
} from "../actionNames.js";


const initState = {
  allCartItems: [],

  // cartItemsToDisplay: [],
  pending: false,
  refreshRequested: true,
  error: null,
  numberOfItems: 0,
  cartItemIds: null,
}

export default (
  state = {...initState},
  action
) => {
  switch (action.type) {
    case GET_CART_ITEMS + "_FULFILLED":
      return { 
        ...state,
        pending: false,
        allCartItems: action.payload.cartItemData,
        cartItemIds: action.payload.cartItemIds,
        refreshRequested: false,
        numberOfItems: action.payload.cartItemData.length,
        // cartItemsToDisplay: action.payload,
      };
    case GET_CART_ITEMS + "_PENDING":
      return { ...state, pending: true,  refreshRequested: false };
    case GET_CART_ITEMS + "_REJECTED":
      return {
        ...state,
        pending: false,
        refreshRequested: false,
        error: action.payload,
        allCartItems: [],
      };

    case ADD_TO_CART + "_FULFILLED":
      return {
        ...state,
        pending: false,
        refreshRequested: true,
        numberOfItems: state.numberOfItems + 1,
        // cartItemsToDisplay: action.payload,
      };
    case ADD_TO_CART + "_PENDING":
      return { ...state, pending: true };
    case ADD_TO_CART + "_REJECTED":
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case DELETE_FROM_CART + "_FULFILLED":
      return {
        ...state,
        pending: false,
        refreshRequested: true,
        numberOfItems: state.numberOfItems - 1,
        // cartItemsToDisplay: action.payload,
      };
    case DELETE_FROM_CART + "_PENDING":
      return { ...state, pending: true };
    case DELETE_FROM_CART + "_REJECTED":
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case RESET_CART:
      return {
        ...initState
      }



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
