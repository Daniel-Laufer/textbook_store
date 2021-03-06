import React, { useEffect } from "react";
import { connect } from "react-redux";

/*                    CSS                                            */

import "../Navbar/Navbar.css";
import "./App.css";

/*                    COMPONENTS                                            */

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartShowcase from "../Cart/CartShowcase";
import LoginPage from "../LoginPage/LoginPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import NewTextbookPage from "../NewTextbookPage/NewTextbookPage";
import AppNav from "../Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import ItemShowcase from "../ItemShowcase/ItemShowcase";

/*                   ACTIONS                                                   */
import UserTextbookShowcase from "../UserTextbookShowcase/UserTextbookShowcase";

import { getTextbooks } from "../../Redux/Actions/textbookActions";
import { getCartItems } from "../../Redux/Actions/cartActions";
import { login, loginWithOldtAuthToken } from "../../Redux/Actions/userActions";

/*                   OTHER                                                   */

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function App({ user, loginWithOldtAuthToken, settings, cartItems }) {
  useEffect(() => {
    if (user.loggedIn) {
      if (cartItems.refreshRequested){
        getCartItems(user.authToken);
      }
    } else {
      const oldAuthToken = localStorage.authToken;
      const timeLoggedIn = new Date(parseInt(localStorage.timeLoggedIn));
      const now = new Date();
      const timeDiff = Math.round(
        ((now - (timeLoggedIn % 86400000)) % 3600000) / 60000
      ); // minutes
      if (oldAuthToken && timeDiff < 10) {
        loginWithOldtAuthToken({ token: oldAuthToken });
        if (!cartItems.pending && user.loggedIn) {
          getCartItems(user.authToken);
        }
      } else {
        delete localStorage.authToken;
        delete localStorage.timeLoggedIn;
      }
    }
  }, [loginWithOldtAuthToken, user.authToken, user.loggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <AppNav />
      <Switch>
        <Route path="/cart">
          <div
            className="App"
            style={{
              backgroundColor: settings.settings.darkTheme
                ? "rgb(56,56,56)"
                : "rgb(255,255,255)",
            }}
          >
            <CartShowcase />
          </div>
        </Route>
        <Route path="/login">
          <div
            style={{
              backgroundColor: settings.settings.darkTheme
                ? "rgb(56,56,56)"
                : "rgb(255,255,255)",
            }}
          >
            <LoginPage darkTheme={settings.settings.darkTheme} />
          </div>
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/newPost">
          <NewTextbookPage
            edit={false}
            darkTheme={settings.settings.darkTheme}
          />
        </Route>
        <Route path="/about">
          <div>
            <h1>The about page!</h1>
            <p>This web app was created by Daniel Laufer.</p>
          </div>
        </Route>
        <Route
          path="/textbooks/user/:userId"
          render={({ match }) => {
            return (
              <div
                className="App"
                style={{
                  backgroundColor: settings.settings.darkTheme
                    ? "rgb(56,56,56)"
                    : "rgb(255,255,255)",
                }}
              >
                <UserTextbookShowcase userId={match.params.userId} />
              </div>
            );
          }}
        />
        <Route
          path="/textbooks/edit/:textbookId"
          render={({ match }) => {
            return (
              <div
                className="App"
                style={{
                  backgroundColor: settings.settings.darkTheme
                    ? "rgb(56,56,56)"
                    : "rgb(255,255,255)",
                }}
              >
                <NewTextbookPage
                  edit={true}
                  textbookId={match.params.textbookId}
                />
              </div>
            );
          }}
        />
        <Route path="/textbooks">
          <div
            className="App"
            style={{
              backgroundColor: settings.settings.darkTheme
                ? "rgb(56,56,56)"
                : "rgb(255,255,255)",
            }}
          >
            <ItemShowcase />
          </div>
        </Route>

        <Route path="/">
          <HomePage />
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
    settings: state.settingsReducer,
  };
};

// similar to above. What actions do I want to use in this module? note: dispatch gets pass
//-ed automatically
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()), // the names you gave in the combine reducers method call
    getTextbooks: () => dispatch(getTextbooks()),
    getCartItems: (authToken) => dispatch(getCartItems(authToken)),
    loginWithOldtAuthToken: (authToken) =>
      dispatch(loginWithOldtAuthToken(authToken)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(App);
