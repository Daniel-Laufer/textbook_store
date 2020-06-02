import React from "react";
import { Navbar, FormControl, Form, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { increment } from "../../Redux/Actions/countActions";
import { handleSearch } from "../../Redux/Actions/searchActions";
import { searchAndUpdateTextbooks } from "../../Redux/Actions/textbookActions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CartShowcase from "../Cart/CartShowcase"
import ItemShowcase from "../ItemShowcase/ItemShowcase"
import "./Navbar.css";

let AppNav = (props) => {
  return (
    <Router>
      <Navbar bg="primary" variant="dark">
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
        <Form inline>
          <FormControl
            type="text"
            onChange={(e) => {
              props.handleSearch(e.target.value);
              props.searchAndUpdateTextbooks(e.target.value);
            }}
            placeholder="Search"
            className="mr-sm-2"
          />
          <Nav className="mr-auto">
            <Nav.Link href="#home">
            <Link to="/cart">
              <i id="cartIcon" className="fas fa-shopping-cart"></i>
            </Link>
            </Nav.Link>
          </Nav>
        </Form>
      </Navbar>

      <Switch>
        <Route path="/cart">
          <CartShowcase/>
        </Route>
        <Route path="/about">The about page!</Route>
        <Route path="/">
          <div className="App">
            <ItemShowcase/>
          </div>
        </Route>
      </Switch>







    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    textbooks: state.textbooksReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (searchTerm) => dispatch(handleSearch(searchTerm)),
    increment: (amount) => dispatch(increment(amount)),
    searchAndUpdateTextbooks: (searchTerm) =>
      dispatch(searchAndUpdateTextbooks(searchTerm)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(AppNav);
