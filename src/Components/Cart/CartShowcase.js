import React, { useEffect } from "react";
import ItemCard from "../ItemShowcase/ItemCard";
import "./CartShowcase.css";
import { getCartItems } from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";
import { Container} from "react-bootstrap";

function CartShowcase({ cartItems, textbooks, getCartItems, user }) {
  const spinnerStyles = { display: cartItems.pending ? "block" : "none" };

    useEffect(() => {
      if(cartItems.refreshRequested){
        getCartItems(user.authToken);
      }
    }, []);


  return (
    <div className="CartShowcase">
      {cartItems.allCartItems.length === 0 ? (
        <div id="empty-cart-message">
            <h1>Your cart is empty.</h1>
        </div>
      ) : (
        cartItems.allCartItems.map((item, index) => {
          return <ItemCard key={index} item={item} />;
        })
      )}
      <div style={spinnerStyles} className="loader">
        <div className="loaderIcon"></div>
      </div>
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
    getCartItems: (authToken) => dispatch(getCartItems(authToken)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(CartShowcase);
