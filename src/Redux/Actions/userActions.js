import {LOGIN, LOGOUT, SIGNUP, GET_SIGNED_IN_PROFILE} from "../actionNames";
import axios from "axios";


export const login = (email, password) => {
    return{
        type: LOGIN,
    payload: axios.post('/login', {"email":email, "password":password}).then(res => res.data)
    }
}


export const signUp = (email, password, name, username, phoneNumber, campus) => {
    return{
        type: SIGNUP,
        payload: axios.post('/signup', {"email":email, "password":password, "name": name, "userName": username, phoneNumber, campus}).then(res => res.data)
    }
}

export const getSignedInProfile = (authToken) => {
    const headers = {
      'Authorization': `Bearer ${!authToken ? 1: authToken.token}`
  };
    return {
      type: GET_SIGNED_IN_PROFILE,
      payload: axios.get(`https://us-central1-textbook-store-2e072.cloudfunctions.net/api/user`, {headers})
        .then((data) => data.data),
    };
  };

export const loginWithOldtAuthToken = (pastAuthToken) => {
    return{
        type: "LOGIN_WITH_OLD_AUTH_TOKEN",
        payload: pastAuthToken
    }
}





export const logout = () => {
    return{
        type: LOGOUT,
    }
}

