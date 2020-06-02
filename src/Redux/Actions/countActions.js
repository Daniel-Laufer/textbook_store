import {INCREMENT} from "../actionNames";


export const increment = (amount) => {
    return{
        type: INCREMENT,
        amount
    }
}