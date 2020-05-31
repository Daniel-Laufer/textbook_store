import React, {useState, useEffect} from 'react';
import axios from "axios";
// import Navbar from "../Navbar/Navbar";
import ItemShowcase from "../ItemShowcase/ItemShowcase";
import CartShowcase from "../Cart/CartShowcase";
import * as data from "../../StoreData/itemData.json";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "../Navbar/Navbar.css"

function App() {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    axios.get("/textbooks").then(res => {console.log(res.data)}).catch(err => console.log(err))
  },[])

  useEffect(() => {
    
    const storeData = data.default.items;
    const newItems = [];
    for(let key in storeData){
      if(storeData[key].title.toLowerCase().includes(searchValue.toLowerCase())){
        newItems.push(storeData[key]);
      }
    }
    setItems([...newItems]);    
  }, [searchValue]);  //runs this useEffect only once on inital render.


  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  }

  const handleCartAction = (id, action) => {
    switch(action){
      case 'add':
        const itemToAdd = items.filter(item => item.id === id)[0];
        const updatedItems = [...cartItems].concat(itemToAdd);
        setCartItems([...updatedItems]);
        break;
      default:
        return null;
    }
  }
  return (
    <Router>  
    <nav id="mainNav" className="navbar navbar-expand-lg navbar-dark bg-primary">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a href="/" className="navbar-brand"><Link id="main-title" to="/">Dan's Textbooks</Link></a>
          {/* Dan's Textbooks</a> */}
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
              <a href="/" className="nav-link">Home<span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
          </li>
          </ul>
          {/* inCart ? {"display": "none"}: {"display": "flex"} */}
          <form className="form-inline my-2 my-lg-0">
              <input onChange={handleSearch} value={searchValue} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          </form>
          <li>
              <Link to="/cart"><a href="/cart"><i id="cartIcon" className="fas fa-shopping-cart"></i></a></Link>
          </li>
      </div>
    </nav>

    
      <Switch>
        <Route path="/cart" render={() => <CartShowcase handleCartAction={handleCartAction} items={[...cartItems]}/>}>
        </Route>
        <Route path="/about">
          The about page!
        </Route>
        <Route path="/">
          <div className="App">
          <ItemShowcase handleCartAction={handleCartAction} items={items}/>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
