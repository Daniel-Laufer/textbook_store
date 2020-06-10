import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';




import {Provider} from "react-redux";
import store from "./Redux/store"
import { getTextbooks} from "./Redux/Actions/textbookActions";

// store.dispatch(getTextbooks());


// note that Provider does **not** automatically connect all our components together with
// the store, it simply gives them the option to. That is why we need to call the connect 
// function in child components
ReactDOM.render(
  <div>
    
  
  <Provider store={store}>
    <App />
    </Provider></div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
