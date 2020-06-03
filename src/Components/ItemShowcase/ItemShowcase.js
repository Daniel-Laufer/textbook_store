import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
import { connect } from "react-redux";
import { handleSearch } from "../../Redux/Actions/searchActions";
import "./ItemShowcase.css";
import { getTextbooks } from "../../Redux/Actions/textbookActions";
import store from "../../Redux/store";

function ItemShowcase(props) {

  
    
  // useEffect(() => {
  //   store.dispatch(getTextbooks());
  // }, []);
  
  

  const spinnerStyles = { display: props.textbooks.pending ? "block" : "none" };
  return (
    <div className="ItemShowcase">
      <div style={spinnerStyles} className="loader">
        <div className="loaderIcon"></div>
      </div>
      {props.textbooks.textbooksToDisplay.map((item, index) => {
        return <ItemCard key={index} item={item} />;
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    textbooks: state.textbooksReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (searchTerm) => dispatch(handleSearch(searchTerm)),
    getTextbooks: () => dispatch(getTextbooks()),
    // increment: (amount) => dispatch(increment(amount)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(ItemShowcase);
