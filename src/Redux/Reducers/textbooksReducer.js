import {
  GET_TEXTBOOKS,
  SEARCH_AND_UPDATE_TEXTBOOKS,
  CREATE_NEW_TEXTBOOK,
  DELETE_ITEM,
  UPDATE_TEXTBOOK,
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

    case DELETE_ITEM + "_FULFILLED":
      return {
        ...state,
        refreshRequired: true,
      };
    case DELETE_ITEM + "_PENDING":
      return { ...state };
    case DELETE_ITEM + "_REJECTED":
      return { ...state, error: action.payload };

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

      if (filtersToCheck.length > 0) {
        let newItemsAfterFilters = [];
        let pushItem;

        newItems.forEach((item) => {
          pushItem = true;
          filtersToCheck.forEach((filter) => {
            if (filter === "coursePrefix") {
              if (
                !item["course"]
                  .toUpperCase()
                  .startsWith(action.payload.filters[filter])
              )
                pushItem = false;
            } else if (filter === "course") {
              // you will be able to erase this else if if all of the courses match exactly.
              if (
                !action.payload.filters[filter].startsWith(
                  item["course"].toUpperCase()
                )
              )
                pushItem = false;
            } else if (item[filter] !== action.payload.filters[filter])
              pushItem = false;
          });
          if (pushItem) newItemsAfterFilters.push(item);
        });
        return { ...state, textbooksToDisplay: [...newItemsAfterFilters] };
      }
      return { ...state, textbooksToDisplay: [...newItems] };

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

    case UPDATE_TEXTBOOK + "_FULFILLED":
      return {
        ...state,
        uploadPending: false,
        refreshRequired: true,
      };
    case UPDATE_TEXTBOOK + "_PENDING":
      return { ...state, uploadPending: true };
    case UPDATE_TEXTBOOK + "_REJECTED":
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
