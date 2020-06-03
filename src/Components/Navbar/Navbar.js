import React from "react";
import { Navbar, FormControl, Form, Nav, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { increment } from "../../Redux/Actions/countActions";
import { handleSearch } from "../../Redux/Actions/searchActions";
import { searchAndUpdateTextbooks } from "../../Redux/Actions/textbookActions";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Actions/userActions";
import "./Navbar.css";

let AppNav = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Navbar.Brand href="#home">
          <Link id="main-title" to="/">
            The Textbook Store!
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form onSubmit={(e) => {e.preventDefault()}} inline>
          <FormControl
            id="search-bar"
            type="text"
            onChange={(e) => {
              props.handleSearch(e.target.value);
              props.searchAndUpdateTextbooks(e.target.value);
            }}
            placeholder="Search"
            className="mr-sm-2"
          />
        </Form>
        <Form id="cart-form" inline>
          <Link to="/cart">
            <Button id="cart-button" type="submit">
              <i id="cartIcon" className="fas fa-shopping-cart"></i>
            </Button>
          </Link>
          <p id="cart-item-counter">19</p>
        </Form>
        {!props.user.loggedIn ? (
          <Link to="/login">
            <Button id="login-logout-button" variant="outline-light">
              Log in
            </Button>
          </Link>
        ) : (
          <Button
            id="login-logout-button"
            onClick={() => props.logout()}
            variant="outline-light"
          >
            Log out
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    textbooks: state.textbooksReducer,
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    handleSearch: (searchTerm) => dispatch(handleSearch(searchTerm)),
    increment: (amount) => dispatch(increment(amount)),
    searchAndUpdateTextbooks: (searchTerm) =>
      dispatch(searchAndUpdateTextbooks(searchTerm)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(AppNav);
