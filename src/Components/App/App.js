import React, { useEffect } from "react";
// import * as data from "../../StoreData/itemData.json";
import AppNav from "../Navbar/Navbar";
import "../Navbar/Navbar.css";
import "./App.css"

import { connect } from "react-redux";
import { increment } from "../../Redux/Actions/countActions";
import { login, loginWithOldtAuthToken } from "../../Redux/Actions/userActions";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartShowcase from "../Cart/CartShowcase";
import ItemShowcase from "../ItemShowcase/ItemShowcase";
import LoginPage from "../LoginPage/LoginPage";
import NewTextbookPage from "../NewTextbookPage/NewTextbookPage";
import { getTextbooks } from "../../Redux/Actions/textbookActions";
import { getCartItems } from "../../Redux/Actions/cartActions";


function App({getTextbooks, user, loginWithOldtAuthToken}) {
  useEffect(() => {
    getTextbooks()
  }, []);

  useEffect(() => {
    increment(5)
    if(user.loggedIn)
      getCartItems(user.authToken);
    else{
      const oldAuthToken = localStorage.authToken;
      if(oldAuthToken){
        loginWithOldtAuthToken({"token": oldAuthToken})
        getCartItems(user.authToken);
      }
    }
  }, [user.authToken]);


  return (
    <Router>
      <AppNav />
      <Switch>
        <Route path="/cart">
        <div className="App" >
          <CartShowcase />
          </div>
        </Route>
        <Route path="/login">
            <LoginPage/>
        </Route>
        <Route path="/newPost">
            <NewTextbookPage/>
        </Route>
        <Route path="/about">The about page!</Route>
        <Route path="/">
          <div className="App">
            <ItemShowcase />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

// which parts of the global state do I want to use here (found in App's props)?
// state gets automatically passed
const mapStateToProps = (state) => {
  return {
    user: state.userReducer, // the names you gave in the combine reducers method call
    count: state.countReducer,
    textbooks: state.textbooksReducer,
    cartItems: state.cartReducer,
  };
};

// similar to above. What actions do I want to use in this module? note: dispatch gets pass
//-ed automatically
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()), // the names you gave in the combine reducers method call
    increment: (amount) => dispatch(increment(amount)),
    getTextbooks: () => dispatch(getTextbooks()),
    getCartItems: (authToken) => dispatch(getCartItems(authToken)),
    loginWithOldtAuthToken: (authToken) => dispatch(loginWithOldtAuthToken(authToken))
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(App);
