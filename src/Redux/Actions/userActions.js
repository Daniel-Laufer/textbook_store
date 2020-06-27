import {LOGIN, LOGOUT, SIGNUP, GET_USER_PUBLIC_INFO} from "../actionNames";
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

export const getUserPublicInfo = (userId) => {
    return{
        type: GET_USER_PUBLIC_INFO,
        payload: axios.get(`/userId${userId}`).then(res => res.data)
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

