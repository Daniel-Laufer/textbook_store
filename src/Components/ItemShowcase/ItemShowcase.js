import React from 'react';
import ItemCard from "./ItemCard"
import {connect} from "react-redux"
import {handleSearch} from "../../Redux/Actions/searchActions";

import "./ItemShowcase.css";

function ItemShowcase(props) {
  return (
    <div className="ItemShowcase">
        {
            props.textbooks.textbooksToDisplay.map((item) => {
                return <ItemCard item={item}/>;
            })
        }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    textbooks: state.textbooksReducer,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: (searchTerm) => dispatch(handleSearch(searchTerm)),
    // increment: (amount) => dispatch(increment(amount)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(ItemShowcase);
