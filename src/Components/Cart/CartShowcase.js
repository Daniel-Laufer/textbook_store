import React, { useEffect, useState } from "react";
import ItemCard from "../ItemShowcase/ItemCard";
import "./CartShowcase.css";
import { getCartItems } from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";
import { Container} from "react-bootstrap";
import TextbookModal from "../Modals/TextbookModal";

function CartShowcase({ cartItems, getCartItems, user, settings }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null);


  function openModal(item) {
    setFocusedItem(item);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    return null;
  }

  const spinnerStyles = { display: cartItems.pending ? "block" : "none" };

    useEffect(() => {
      if(cartItems.refreshRequested && user.loggedIn && !cartItems.pending){
        console.log("Cartshowcase getCartItems")

        getCartItems(user.authToken);
      }
    }, [getCartItems, user.authToken, cartItems.refreshRequested, user.loggedIn]); // this list was empty normally


  return (
    <Container style={{"backgroundColor": settings.settings.darkTheme ? 'rgb(56,56,56)': "rgb(255,255,255)"}}>
    <div className="CartShowcase">
      {cartItems.allCartItems.length === 0 ? (
        <div id="empty-cart-message">
            <h1>Your cart is empty.</h1>
        </div>
      ) : (
        cartItems.allCartItems.map((item, index) => {
          return <ItemCard key={index} item={item} openModal={openModal} />;
        })
      )}
      <div style={spinnerStyles} className="loader">
        <div className="loaderIcon"></div>
      </div>
      <TextbookModal
        funcs={{ modalIsOpen, openModal, afterOpenModal, closeModal }}
        item={focusedItem}
      />
    </div>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer, // the names you gave in the combine reducers method call
    cartItems: state.cartReducer,
    textbooks: state.textbooksReducer,
    settings: state.settingsReducer
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
