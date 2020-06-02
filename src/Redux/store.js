import {combineReducers, applyMiddleware, compose} from "redux";
import countReducer from "./Reducers/countReducer.js"
import userReducer from "./Reducers/userReducer.js"
import textbooksReducer from "./Reducers/textbooksReducer.js"
import searchReducer from "./Reducers/searchReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
import {createStore} from "redux";


import thunk from "redux-thunk";
import promise from 'redux-promise-middleware'

const middleware = [ promise, thunk ];

export default createStore(combineReducers({searchReducer, countReducer, userReducer,textbooksReducer }), {}, compose(applyMiddleware(...middleware), composeWithDevTools()));


