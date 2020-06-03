import { GET_TEXTBOOKS, SEARCH_AND_UPDATE_TEXTBOOKS } from "../actionNames.js";

export default (
  state = {
    allTextbooks: [],
    textbooksToDisplay: [],
    pending: true,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_TEXTBOOKS + "_FULFILLED":
      return {
        ...state,
        pending: false,
        allTextbooks: [...action.payload],
        textbooksToDisplay: [...action.payload],
      };
    case GET_TEXTBOOKS + "_PENDING":
      return { ...state, pending: true };
    case GET_TEXTBOOKS + "_REJECTED":
      return { ...state, error: action.payload };
    case SEARCH_AND_UPDATE_TEXTBOOKS:
      const newItems = [];
      for (let key in state.allTextbooks) {
        if (
          state.allTextbooks[key].title
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        )
          newItems.push(state.allTextbooks[key]);
      }
      return { ...state, textbooksToDisplay: [...newItems] };
    default:
      return state;
  }
};
