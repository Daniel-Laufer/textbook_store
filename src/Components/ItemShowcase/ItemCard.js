import React, { useState, useEffect } from "react";
import "./ItemCard.css";
import {
  addItemToCart,
  deleteItemFromCart,
  getCartItems,
} from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";

function ItemCard({
  item,
  openModal,
  addItemToCart,
  deleteItemFromCart,
  user,
  cart,
  getCartItems,
}) {
  const [displayDelete, setDisplayDelete] = useState(false);

  useEffect(() => {
    if (cart.cartItemIds && cart.cartItemIds.includes(item.textbookId)) {
      return setDisplayDelete(true);
    }
    setDisplayDelete(false);
  }, [cart.cartItemIds]);

  useEffect(() => {
    if (cart.refreshRequested && user.loggedIn && !cart.pending) {
      console.log("Card getCartItems")

      getCartItems(user.authToken);
      cart.refreshRequested = false;
    }
  }, [cart.refreshRequested]);

  const handleDelete = () => {
    deleteItemFromCart(user.authToken, item.textbookId);
    item.cartCount -= 1;
  };

  if (item) {
    return (
      <div className="card">
        <div id="cartCountContainer">
          <i
            id="cartCountIcon"
            // style={{ display: item.cartCount === 0 ? "none" : "block" }}
            style={{ color: item.cartCount === 0 ? "gray" : "orange" }}
            className="fas fa-star"
          ></i>
          <div
            // style={{ display: item.cartCount === 0 ? "none" : "block" }}
            // style={{ color: item.cartCount === 0 ? "black" : "white" }}
            id="cartCount"
          >
            {item ? item.cartCount : 0}
          </div>
        </div>
        <div
          id="imageContainer"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          {/* <img
          id="textbookImage"
          className="card-img-top"
          src={item.image}
          alt={item.title}
        /> */}
        </div>
        <div className="card-body">
          <div className="card-title-container">
            <h5 className="card-title">
              {item.title.length > 35
                ? item.title.substring(0, 35) + "..."
                : item.title}
            </h5>
          </div>
          <hr/>
          <div className="sellerInfoContainer">
            <img
              id="profile-picture"
              src={item.sellerPublicInfo.profilePicture}
              alt="profile picture"
            />
            <div className="sellerUsername">
              {item.sellerPublicInfo.userName.substring(0, 16) +
                (item.sellerPublicInfo.userName.length > 16 ? "..." : "")}
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="modal-section-title">
                <strong>Used at: </strong>
              </span>
              {item ? item.campus.toUpperCase() : ""}
            </li>
            <li className="list-group-item">
              <span className="modal-section-title">
                <strong>Course: </strong>
              </span>
              {item ? item.course.toUpperCase() : ""}
            </li>
            <li className="list-group-item">
              <span className="modal-section-title">
                <strong>Pickup Location: </strong>
              </span>
              {item ? item.sellingLocation : ""}
            </li>
          </ul>
          {/* <div className="contactInfoContainer">
          <div
            id="profilePicture"
            style={{ backgroundImage: `url(${url})` }}
          ></div>
          <div className="sellerUsername">{item.seller.sellerUsername}</div>
        </div> */}

          {/* <p className="card-text">
          {item.description.length > 25
            ? item.description.substring(0, 25) + "..."
            : item.description}
        </p> */}
          {/* <p>
            <strong>
              <em>Expand this card to see more!</em>
            </strong>
          </p> */}
        </div>

        <div id="cartButtonHolder" className="card-body">
          <button
            disabled={user.loggedIn ? false : true}
            title={`Add to cart ${
              user.loggedIn ? "" : "(Please login first!)"
            }`}
            onClick={() => {
              addItemToCart(user.authToken, item.textbookId);
              item.cartCount += 1;
            }}
            type="button"
            className="btn btn-primary"
          >
            <i className="fas fa-star"></i>
          </button>

          <button
            type="button"
            onClick={() => openModal(item)}
            className="btn btn-info"
            id="item-card-info-button"
          >
            <i className="fas fa-info"></i>
          </button>
          <button
            type="button"
            title={`Remove from cart ${
              user.loggedIn ? "" : "(Please login first!)"
            } ${displayDelete ? "" : "(This item is not in your cart!)"}`}
            disabled={displayDelete ? false : true}
            onClick={() => {
              handleDelete();
            }}
            className="btn btn-danger"
          >
            <i className="far fa-times-circle"></i>
          </button>
        </div>
      </div>
    );
  }
  return null;
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    cart: state.cartReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (auth, textbookId) =>
      dispatch(addItemToCart(auth, textbookId)),
    deleteItemFromCart: (auth, textbookId) =>
      dispatch(deleteItemFromCart(auth, textbookId)),
    getCartItems: (auth) => dispatch(getCartItems(auth)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
