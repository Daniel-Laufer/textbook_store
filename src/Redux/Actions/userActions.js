import {LOGIN, LOGOUT, LOGIN_WITH_OLD_AUTH_TOKEN} from "../actionNames";
import axios from "axios";


export const login = (email, password) => {
    return{
        type: LOGIN,
        payload: axios.post('/login', {"email":email, "password":password}).then(res => res.data)
    }
}

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

