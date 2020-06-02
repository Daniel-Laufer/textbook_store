import {HANDLE_SEARCH} from "../actionNames";

export const handleSearch = (searchTerm) => {
  return {
    type: HANDLE_SEARCH,
    payload: searchTerm,
  };
};
