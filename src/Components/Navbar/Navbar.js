import React, { useEffect, useState } from "react";
import { Navbar, FormControl, Form, Nav, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { increment } from "../../Redux/Actions/countActions";
import { updateSearch } from "../../Redux/Actions/searchActions";
import { searchAndUpdateTextbooks } from "../../Redux/Actions/textbookActions";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Actions/userActions";
import { getCartItems } from "../../Redux/Actions/cartActions";
import "./Navbar.css";
import { useHistory } from "react-router-dom";

let AppNav = ({
  updateSearch,
  searchAndUpdateTextbooks,
  user,
  logout,
  cartItems,
  getCartItems,
  search
}) => {
  const history = useHistory();

  useEffect(() => {
    if (user.loggedIn){
      getCartItems(user.authToken);
    } 
  }, [user.authToken, getCartItems, user.loggedIn]);

  const handleLogOut = () => {
    delete localStorage.authToken;
    logout();
    history.push("/");
  };

  const [navExpanded, setNavExpanded] = useState(false);

  const hideNav = () => {
    setNavExpanded(false);
  };

  const spinnerStyles = { display: cartItems.pending ? "block" : "none" };

  const cartButtonStyles = { display: user.loggedIn ? "flex" : "none" };

  return (
    <Navbar
      expanded={navExpanded}
      onToggle={() => setNavExpanded(!navExpanded)}
      collapseOnSelect
      expand="lg"
      bg="primary"
      id="nav"
      variant="dark"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <div className="nav-brand">

          <Link id="main-title" to="/">
            The Textbook Trading Post
          </Link>
        </div>
        {/* </Navbar.Brand> */}
        <Nav className="mr-auto">
          <div className="nav-link">

            <Link id="about-link" to="/about">
              About
            </Link>
          </div>
        </Nav>
        <Form style={cartButtonStyles} id="cart-form" inline>
          <Link to="/cart">
            <Button onClick={hideNav} id="cart-button" type="submit">
              <i id="cartIcon" className="fas fa-shopping-cart"></i>
            </Button>
          </Link>
          <div id="cart-item-counter">
            <div style={spinnerStyles} className="loader">
              <div className="cartLoaderIcon"></div>
            </div>
            {cartItems.pending ? "" : cartItems.numberOfItems}
          </div>
        </Form>
        <div id="button-holder-div">
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
          ) : (
            <Button
              id="login-logout-button"
              onClick={() => {
                handleLogOut();
                hideNav();
              }}
              variant="outline-light"
            >
              Log out
            </Button>
          )}
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
        </div>
        {/* <Button id="newTextbookPost" style={{'display' : user.loggedIn ? 'flex': 'none'}} variant="light">+</Button> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    cartItems: state.cartReducer,
    search: state.searchReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    updateSearch: (searchTerm) => dispatch(updateSearch(searchTerm)),
    increment: (amount) => dispatch(increment(amount)),
    searchAndUpdateTextbooks: (searchTerm, filters) =>
      dispatch(searchAndUpdateTextbooks(searchTerm, filters)),
    getCartItems: (authToken) => dispatch(getCartItems(authToken)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(AppNav);
