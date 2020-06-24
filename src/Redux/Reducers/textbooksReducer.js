import {
  GET_TEXTBOOKS,
  SEARCH_AND_UPDATE_TEXTBOOKS,
  CREATE_NEW_TEXTBOOK,
  APPLY_FILTER,
} from "../actionNames.js";

export default (
  state = {
    allTextbooks: [],
    textbooksToDisplay: [],
    pending: true,
    error: null,
    loadRequested: true,
    uploadPending: false,
    refreshRequired: true,
  },
  action
) => {
  switch (action.type) {
    case GET_TEXTBOOKS + "_FULFILLED":
      return {
        ...state,
        pending: false,
        allTextbooks: action.payload,
        textbooksToDisplay: action.payload,
        loadRequested: false,
        refreshRequired: false,
      };
    case GET_TEXTBOOKS + "_PENDING":
      return { ...state, pending: true };
    case GET_TEXTBOOKS + "_REJECTED":
      return { ...state, pending: false, error: action.payload };
    case SEARCH_AND_UPDATE_TEXTBOOKS:
      const newItems = [];
      const filtersToCheck = Object.keys(action.payload.filters).filter(
        (key) => action.payload.filters[key] !== null
      );

      for (let key in state.allTextbooks) {
        if (
          state.allTextbooks[key].title
            .toLowerCase()
            .includes(action.payload.searchTerm.toLowerCase())
        )
          newItems.push(state.allTextbooks[key]);
      }
      if(filtersToCheck.length > 0){

        let newItemsAfterFilters = []
  
        filtersToCheck.forEach((filter) => {
          newItems.forEach((item, index) => {
            if (item[filter] === action.payload.filters[filter]) 
              newItemsAfterFilters.push(item);
            
        
          });
        });
        return { ...state, textbooksToDisplay: [...newItemsAfterFilters] };
      }

      return { ...state, textbooksToDisplay: [...newItems] };
    // case APPLY_FILTER:
    //   const newItems = [];
    //   for (let key in state.textbooksToDisplay) {
    //     if (
    //       state.textbooksToDisplay[key].title
    //         .toLowerCase()
    //         .includes(action.payload.toLowerCase())
    //     )
    //       newItems.push(state.textbooksToDisplay[key]);
    //   }
    //   return { ...state, textbooksToDisplay: [...newItems] };

    case CREATE_NEW_TEXTBOOK + "_FULFILLED":
      return {
        ...state,
        uploadPending: false,
        refreshRequired: true,
      };
    case CREATE_NEW_TEXTBOOK + "_PENDING":
      return { ...state, uploadPending: true };
    case CREATE_NEW_TEXTBOOK + "_REJECTED":
      return {
        ...state,
        uploadPending: false,
        error: action.payload,
        refreshRequired: false,
      };

    default:
      return state;
  }
};
