import {LOGIN, LOGOUT} from "../actionNames";
import axios from "axios";


export const login = (email, password) => {
    return{
        type: LOGIN,
        payload: axios.post('/login', {"email":email, "password":password}).then(res => res.data)
    }
}


export const logout = () => {
    return{
        type: LOGOUT,
    }
}

