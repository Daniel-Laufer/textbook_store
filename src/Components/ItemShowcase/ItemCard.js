import React from "react";
import "./ItemCard.css";
import { addItemToCart } from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";


function ItemCard({ item, openModal, addItemToCart, user }) {
  return (
    <div className="card">
      <div id="imageContainer" style={{"backgroundImage": `url(${item.image})`}}>
        {/* <img
          id="textbookImage"
          className="card-img-top"
          src={item.image}
          alt={item.title}
        /> */}
      </div>
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">
          {item.description.length > 25 ? item.description.substring(0, 25) + '...': item.description}
        </p>
        <p><strong><em>Expand this card to see more!</em></strong></p>
      </div>
      

      <div id="cartButtonHolder" className="card-body">
        <button onClick={() => addItemToCart(user.authToken, item.textbookId)}type="button" className="btn btn-primary">
          <i className="fas fa-shopping-cart"></i>
        </button>
        
          <button
            type="button"
            onClick={() => openModal(item)}
            className="btn btn-info"
          >
            <i className="fas fa-info"></i>
          </button>
        
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (auth, textbookId) =>
      dispatch(addItemToCart(auth, textbookId)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
