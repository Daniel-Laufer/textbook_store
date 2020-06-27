import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import CompactItemCard from "./CompactItemCard";
import { connect } from "react-redux";
import "./ItemShowcase.css";
import "./CompactItemCard.css";

import { getTextbooks } from "../../Redux/Actions/textbookActions";
import { Container } from "react-bootstrap";

import TextbookModal from "../Modals/TextbookModal";
import { addItemToCart, getCartItems } from "../../Redux/Actions/cartActions";
import FilterContainer from "./Filters/FilterContainer/FilterContainer";

function ItemShowcase({ textbooks, getTextbooks, cart, settings}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null);
  const [refreshedCart, setRefreshedCart] = useState(false);

  function openModal(item) {
    setFocusedItem(item);
    setIsOpen(true);
  }

  useEffect(() => {
    if (textbooks.refreshRequired) {
      getTextbooks();
    }
  }, [textbooks.refreshRequired, getTextbooks]);

  // useEffect(() => {
  //   if(refreshedCart && !cart.refreshRequired){
  //     setRefreshedCart(false);
  //   }
  // }, [cart.refreshRequired]);


  

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    return null;
  }

  function closeModal() {
    setIsOpen(false);
  }

  const sendCartRefreshRequest = () => {
    if(!refreshedCart){
      setRefreshedCart(true);
      cart.refreshRequired = true;
    }
  }

  const spinnerStyles = { display: textbooks.pending ? "block" : "none" };
  return (
    <>
      <FilterContainer />
      <Container>
        <div className={settings.settings.compactCards ? "compact-item-showcase" : "item-showcase"} >
          <div style={spinnerStyles} className="loader">
            <div className="loaderIcon"></div>
          </div>
          {textbooks.textbooksToDisplay.map((item, index) => {
            if (settings.settings.compactCards)
              return (
                <CompactItemCard
                  openModal={openModal}
                  key={index}
                  item={item}
                  sendCartRefreshRequest={sendCartRefreshRequest}
                />
              );

            return <ItemCard openModal={openModal} key={index} item={item} />;
          })}
          </div>
        <TextbookModal
          funcs={{ modalIsOpen, openModal, afterOpenModal, closeModal }}
          item={focusedItem}
        />
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    textbooks: state.textbooksReducer,
    user: state.userReducer,
    cart: state.cartReducer,
    settings: state.settingsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTextbooks: () => dispatch(getTextbooks()),
    addItemToCart: (auth, textbookId) =>
      dispatch(addItemToCart(auth, textbookId)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(ItemShowcase);
