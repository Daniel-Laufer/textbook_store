import React, { useEffect } from "react";
import ItemCard from "../ItemShowcase/ItemCard";
import "./CartShowcase.css";
import { getCartItems } from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";

function CartShowcase({ cartItems, textbooks}) {

  const spinnerStyles = { display: cartItems.pending ? "block" : "none" };



  return (
    <div className='CartShowcase'>
      <div style={spinnerStyles} className="loader">
        <div className="loaderIcon"></div>
      </div>
      {cartItems.allCartItems.length === 0 ? (
        <h1>No items in your cart!</h1>
      ) : (
        cartItems.allCartItems.map((item, index) => {
          return <ItemCard key={index} item={item}/>;
        })
      )}

    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer, // the names you gave in the combine reducers method call
    cartItems: state.cartReducer,
    textbooks: state.textbooksReducer,
  };
};

// similar to above. What actions do I want to use in this module? note: dispatch gets pass
//-ed automatically
const mapDispatchToProps = (dispatch) => {
  return {
    getCartItems: (authToken) => dispatch(getCartItems(authToken))
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(CartShowcase);
