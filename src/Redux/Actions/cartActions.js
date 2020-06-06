import { GET_CART_ITEMS } from "../actionNames";
const axios = require("axios");


export const getCartItems = (authToken) => {
  const headers = {
    'Authorization': `Bearer ${authToken === null ? 1: authToken.token}`
  };
  return {
    type: GET_CART_ITEMS,
    payload: axios.get("/cart", {headers})
      .then((data) => data.data),
  };
};
