import React, { useEffect, useState } from "react";
import { Navbar, Form, Nav, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { updateSearch } from "../../Redux/Actions/searchActions";
import { searchAndUpdateTextbooks } from "../../Redux/Actions/textbookActions";
import { Link } from "react-router-dom";
import { logout, getSignedInProfile } from "../../Redux/Actions/userActions";
import { getCartItems } from "../../Redux/Actions/cartActions";
import "./Navbar.css";
import { useHistory } from "react-router-dom";

import SettingsMenu from "./SettingsMenu";
import UserMenu from "./UserMenu";

let AppNav = ({
  user,
  logout,
  cartItems,
  getCartItems,
  getSignedInProfile,
  settings,
}) => {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (user.loggedIn && !cartItems.pending) {
      getCartItems(user.authToken);
    }
  }, [user.authToken, getCartItems, user.loggedIn]);

  useEffect(() => {
    if (user.loggedIn && user.error) {
      delete localStorage.authToken;
      logout();
      history.push("/textbooks");
    }
  }, [user.error, user.loggedIn]);

  useEffect(() => {
    if (user.loggedIn && user.updateRequested) {
      getSignedInProfile(user.authToken);
    }
  }, [user.updateRequested, user.authToken, user.loggedIn, getSignedInProfile]);

  const [navExpanded, setNavExpanded] = useState(false);

  const hideNav = () => {
    setNavExpanded(false);
  };

  const spinnerStyles = { display: cartItems.pending ? "block" : "none" };

  
  const spinnerStylesUser = {
    display: user.loadProfilePending ? "block" : "none",
  };

  const cartButtonStyles = { display: user.loggedIn ? "flex" : "none" };

  return (
    <>
      <Navbar
        expanded={navExpanded}
        onToggle={() => setNavExpanded(!navExpanded)}
        collapseOnSelect
        expand="lg"
        id="nav"
        variant="dark"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="nav-brand">
            <Link id="main-title" to="/">
              <img
                alt="logo"
                id="navbar-logo"
                src="https://firebasestorage.googleapis.com/v0/b/textbook-store-2e072.appspot.com/o/App_images_and_gifs%2FtextbookLogo.png?alt=media&token=a0a8c552-c182-422c-b519-9f2ef5a6a571"
              />
              The Textbook Exchanger
            </Link>
          </div>
          {/* </Navbar.Brand> */}
          <Nav className="mr-auto">
            <div className="nav-link">
              <Link id="browse-link" to="/textbooks">
                Browse
              </Link>
            </div>
          </Nav>
          <Form style={cartButtonStyles} id="cart-form" inline>
            <Link to="/cart">
              <Button onClick={hideNav} id="cart-button" type="submit">
                <i id="cartIcon" className="fas fa-star"></i>
              </Button>
            </Link>
            <div id="cart-item-counter">
              <div style={spinnerStyles} className="loader">
                <div className="cartLoaderIcon"></div>
              </div>
              {cartItems.pending ? "" : cartItems.numberOfItems}
            </div>
          </Form>
          <div
            id="button-holder-div"
            style={!user.loggedIn ? { width: "150px" } : {}}
          >
            {!user.loggedIn ? (
              <Link to="/login">
                <Button
                  onClick={hideNav}
                  id="login-logout-button"
                  variant="outline-light"
                >
                  Log in
                </Button>
              </Link>
            ) : null}
            <Link to="/newPost">
              <Button
                style={{ display: user.loggedIn ? "inline-block" : "none" }}
                onClick={hideNav}
                id="new-post-button"
                variant="light"
              >
                +
              </Button>
            </Link>
            <Button
              className="settings-button"
              onClick={() => {
                setSettingsMenuOpen(!settingsMenuOpen);
              }}
            >
              <i className="fas fa-cog"></i>
            </Button>
            {settingsMenuOpen ? (
              <SettingsMenu
                darkTheme={settings.settings.darkTheme}
                setSettingsMenuOpen={setSettingsMenuOpen}
              />
            ) : null}
            {userMenuOpen ? (
              <UserMenu
                darkTheme={settings.settings.darkTheme}
                hideNav={hideNav}
                setUserMenuOpen={setUserMenuOpen}
              />
            ) : null}
            {/* <Button id="profilePictureButton"></Button> */}
            {user.publicUserInfo ? (
              <img
                onClick={() => setUserMenuOpen(true)}
                id="nav-profile-pic"
                src={user.publicUserInfo.profilePicture}
                alt=""
              />
            ) : (
              <div style={spinnerStylesUser} className="loader">
                <div className="profilePictureLoaderIcon"></div>
              </div>
            )}
          </div>
          {/* <Button id="newTextbookPost" style={{'display' : user.loggedIn ? 'flex': 'none'}} variant="light">+</Button> */}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    cartItems: state.cartReducer,
    search: state.searchReducer,
    settings: state.settingsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    updateSearch: (searchTerm) => dispatch(updateSearch(searchTerm)),
    searchAndUpdateTextbooks: (searchTerm, filters) =>
      dispatch(searchAndUpdateTextbooks(searchTerm, filters)),
    getCartItems: (authToken) => dispatch(getCartItems(authToken)),
    getSignedInProfile: (authToken) => dispatch(getSignedInProfile(authToken)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(AppNav);
