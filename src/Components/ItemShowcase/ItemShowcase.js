import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import CompactItemCard from "./CompactItemCard";
import { connect } from "react-redux";
import "./ItemShowcase.css";
import "./CompactItemCard.css";

import { getTextbooks } from "../../Redux/Actions/textbookActions";
import { Container } from "react-bootstrap";

import TextbookModal from "../Modals/TextbookModal";
import { addItemToCart } from "../../Redux/Actions/cartActions";
import FilterContainer from "./Filters/FilterContainer/FilterContainer";

function ItemShowcase({ textbooks, getTextbooks, cart, settings, user }) {
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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    return null;
  }

  function closeModal() {
    setIsOpen(false);
  }

  const sendCartRefreshRequest = () => {
    if (!refreshedCart) {
      setRefreshedCart(true);
      cart.refreshRequired = true;
    }
  };

  const spinnerStyles = {
    display: textbooks.pending ? "block" : "none",
  };
  return (
    <>
      <FilterContainer />
      <div
        style={{
          backgroundColor: settings.settings.darkTheme
            ? "rgb(56,56,56)"
            : "rgb(255,255,255)",
        }}
      >
        <Container>
          <div
            className={
              settings.settings.compactCards
                ? "compact-item-showcase"
                : "item-showcase"
            }
          >
            <div style={spinnerStyles} className="loader">
              <div className="loaderIcon"></div>
            </div>

            {textbooks.textbooksToDisplay.map((item, index) => {
              if (settings.settings.compactCards)
                return (
                  <CompactItemCard
                    openModal={openModal}
                    darkTheme={settings.settings.darkTheme}
                    key={index}
                    item={item}
                  />
                );

              return (
                <ItemCard
                  darkTheme={settings.settings.darkTheme}
                  openModal={openModal}
                  key={index}
                  item={item}
                />
              );
            })}
          </div>
          <TextbookModal
            darkTheme={settings.settings.darkTheme}
            funcs={{ modalIsOpen, openModal, afterOpenModal, closeModal }}
            item={focusedItem}
            cart={cart}
          />
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    textbooks: state.textbooksReducer,
    user: state.userReducer,
    cart: state.cartReducer,
    settings: state.settingsReducer,
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
