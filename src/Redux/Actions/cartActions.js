import { GET_CART_ITEMS, ADD_TO_CART, DELETE_FROM_CART, RESET_CART } from "../actionNames";
const axios = require("axios");
axios.defaults.baseURL =
  "https://us-central1-textbook-store-2e072.cloudfunctions.net/api";

export const getCartItems = (authToken) => {
  const headers = {
    Authorization: `Bearer ${!authToken ? 1 : authToken.token}`,
  };
  return {
    type: GET_CART_ITEMS,
    // payload: new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       "cartItemData": [],
    //       "cartItemIds": []
    //   });
    //   }, 1000);
    // }),

    payload: axios
      .get(
        "https://us-central1-textbook-store-2e072.cloudfunctions.net/api/cart",
        { headers }
      )
      .then((data) => data.data),
  };
};

export const addItemToCart = (authToken, textbookId) => {
  const headers = {
    // 'Authorization': `Bearer ${authToken === null ? 1: authToken.token}`
    Authorization: `Bearer ${authToken.token}`,
  };
  return {
    type: ADD_TO_CART,
    payload: axios
      .post(`/cart/${textbookId}`, {}, { headers })
      .then((data) => data.data),
  };
};

export const deleteItemFromCart = (authToken, textbookId) => {
  const headers = {
    // 'Authorization': `Bearer ${authToken === null ? 1: authToken.token}`
    Authorization: `Bearer ${authToken.token}`,
  };
  return {
    type: DELETE_FROM_CART,
    payload: axios
      .delete(`/cart/${textbookId}`, { headers })
      .then((data) => data.data),
  };
};



export const resetCart = (authToken, textbookId) => {
  return {
    type: RESET_CART
  };
};
