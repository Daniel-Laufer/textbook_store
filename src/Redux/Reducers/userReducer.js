import {
  LOGIN,
  LOGOUT,
  LOGIN_WITH_OLD_AUTH_TOKEN,
  SIGNUP,
} from "../actionNames";

const initialState = {
  authToken: null,
  //   username: "ERROR",
  loggedIn: false,
  pending: false,
  error: null,
  //   fname: "ERROR",
  //   lname: "ERROR",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_WITH_OLD_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
        loggedIn: true,
        pending: false,
        error: null,
      };
    case LOGIN + "_FULFILLED":
      return {
        ...state,
        authToken: action.payload,
        loggedIn: true,
        pending: false,
        error: null,
      };
    case LOGIN + "_PENDING":
      return { ...state, pending: true };
    case LOGIN + "_REJECTED":
      return { ...state, error: action.payload };

    case SIGNUP + "_FULFILLED":
      return {
        ...state,
        authToken: action.payload,
        loggedIn: true,
        pending: false,
        error: null,
      };
    case SIGNUP + "_PENDING":
      return { ...state, pending: true };
    case SIGNUP + "_REJECTED":
      return { ...state, error: action.payload };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};
