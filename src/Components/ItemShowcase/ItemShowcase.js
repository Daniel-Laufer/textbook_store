import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { connect } from "react-redux";
import { handleSearch } from "../../Redux/Actions/searchActions";
import "./ItemShowcase.css";
import { getTextbooks } from "../../Redux/Actions/textbookActions";
import store from "../../Redux/store";
import { Container } from "react-bootstrap";

import TextbookModal from "../Modals/TextbookModal";
import { addItemToCart } from "../../Redux/Actions/cartActions";

function ItemShowcase(props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null);


  function openModal(item) {
    setFocusedItem(item);
    setIsOpen(true);
  }

  useEffect(() => {
    
    if(props.textbooks.refreshRequired){
      
      props.getTextbooks();
    }
  }, [])

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    return null;
  }

  function closeModal() {
    setIsOpen(false);
  }

  const spinnerStyles = { display: props.textbooks.pending ? "block" : "none" };
  return (
    <Container>
      <div className="item-showcase">
        <div style={spinnerStyles} className="loader">
          <div className="loaderIcon"></div>
        </div>
        {props.textbooks.textbooksToDisplay.map((item, index) => {
          return (
            <ItemCard
              openModal={openModal}
              key={index}
              item={item}
            />
          );
        })}
      </div>
      <TextbookModal
        funcs={{ modalIsOpen, openModal, afterOpenModal, closeModal }}
        item={focusedItem}
      />
    </Container>
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
    handleSearch: (searchTerm) => dispatch(handleSearch(searchTerm)),
    getTextbooks: () => dispatch(getTextbooks()),
    addItemToCart: (auth, textbookId) =>
      dispatch(addItemToCart(auth, textbookId)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(ItemShowcase);
