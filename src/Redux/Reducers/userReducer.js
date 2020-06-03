import { LOGIN, LOGOUT } from "../actionNames";


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
    case LOGIN + "_FULFILLED":
      return {
        ...state,
        authToken: action.payload,
        loggedIn: true,
        pending: false,
        error:null
      };
    case LOGIN + "_PENDING":
      return { ...state, pending: true };
    case LOGIN + "_REJECTED":
      return { ...state, error: action.payload };
    case LOGOUT:
      return {...initialState}
    default:
      return state;
  }
};
