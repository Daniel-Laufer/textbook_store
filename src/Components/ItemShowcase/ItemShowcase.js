import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { connect } from "react-redux";
import "./ItemShowcase.css";
import { getTextbooks } from "../../Redux/Actions/textbookActions";
import { Container } from "react-bootstrap";

import TextbookModal from "../Modals/TextbookModal";
import { addItemToCart } from "../../Redux/Actions/cartActions";
import FilterContainer from "./Filters/FilterContainer/FilterContainer";

function ItemShowcase({ textbooks, getTextbooks }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null);

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

  const spinnerStyles = { display: textbooks.pending ? "block" : "none" };
  return (
    <>
      <FilterContainer />
      <Container>
        <div className="item-showcase">
          <div style={spinnerStyles} className="loader">
            <div className="loaderIcon"></div>
          </div>
          {textbooks.textbooksToDisplay.map((item, index) => {
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
