import {
  LOGIN,
  LOGOUT,
  LOGIN_WITH_OLD_AUTH_TOKEN,
  SIGNUP,
  GET_SIGNED_IN_PROFILE,
  UPDATE_PROFILE_PICTURE
} from "../actionNames";

const initialState = {
  authToken: null,
  //   username: "ERROR",
  loggedIn: false,
  pending: false,
  error: null,
  loadProfilePending: false,
  publicUserInfo: null,
  updateRequested: true
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
      return { ...state, error: action.payload, pending: false };

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
      return { ...state, pending: false, error: action.payload };


    case GET_SIGNED_IN_PROFILE + "_FULFILLED":
      return {
        ...state,
        loadProfilePending: false,
        updateRequested: false,
        publicUserInfo: {...action.payload}
      };
    case GET_SIGNED_IN_PROFILE + "_PENDING":
      return { ...state, loadProfilePending: true };
    case GET_SIGNED_IN_PROFILE + "_REJECTED":
      return { ...state, error: action.payload, loadProfilePending: false, updateRequested: false };



    case UPDATE_PROFILE_PICTURE + "_FULFILLED":
      return {
        ...state,
        updateRequested: true,
        loadProfilePending: false
      };
    case UPDATE_PROFILE_PICTURE + "_PENDING":
      return { ...state, loadProfilePending: true };
    case UPDATE_PROFILE_PICTURE + "_REJECTED":
      return { ...state, error: action.payload, loadProfilePending: false };


    case LOGOUT:
      return { ...initialState};

    
      
    default:
      return state;
  }
};
