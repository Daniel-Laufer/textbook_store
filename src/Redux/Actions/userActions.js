import {LOGIN, SET_AGE} from "../actionNames";




export const login = () => {
    return{
        type: LOGIN,
    }
}

export const setAge = (age) => {
    return{
        type: SET_AGE,
        age: age
    }
}
