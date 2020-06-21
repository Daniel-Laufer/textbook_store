import {UPDATE_FILTERS, UPDATE_SEARCH} from "../actionNames";

export const updateSearch = (searchTerm) => {
  return {
    type: UPDATE_SEARCH,
    payload: searchTerm,
  };
};
export const updateFilters = (filters) => {
  return {
    type: UPDATE_FILTERS,
    payload: filters,
  };
};
