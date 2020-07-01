import {UPDATE_SETTINGS} from "../actionNames";

export default (state={settings: {darkTheme: false, compactCards: false}}, action) => {
    switch(action.type){
        case UPDATE_SETTINGS:
            return {...state,  settings: {...action.payload}}
        default:
            return state
    }
}