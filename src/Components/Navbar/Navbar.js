import React from 'react';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";



function Navbar({onInputChange, searchValue, inCart}){
    return(
        <Router>
        <nav id="mainNav" className="navbar navbar-expand-lg navbar-dark bg-primary">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link to="/">Hello</Link>
                {/* <a href="/" vid="mainTitle" className="navbar-brand">Dan's Textbooks</a> */}
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a href="/" className="nav-link">Home<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/about">About</a>
                </li>
                </ul>
                <form style={inCart ? {"display": "none"}: {"display": "flex"}} className="form-inline my-2 my-lg-0">
                    <input onChange={onInputChange} value={searchValue} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button type="button" type="submit" className="btn btn-light">Light</button>
                </form>
                <li>
                    <a href="/cart"><i id="cartIcon" className="fas fa-shopping-cart"></i></a>
                </li>
            </div>
        </nav>
        </Router>
    );
}





export default Navbar;