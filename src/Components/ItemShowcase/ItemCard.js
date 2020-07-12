import React, { useState, useEffect } from "react";
import "./ItemCard.css";
import {
  addItemToCart,
  deleteItemFromCart,
  getCartItems,
} from "../../Redux/Actions/cartActions";

import { deleteItem } from "../../Redux/Actions/textbookActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

function ItemCard({
  item,
  openModal,
  addItemToCart,
  deleteItemFromCart,
  user,
  cart,
  getCartItems,
  darkTheme,
  adminAccess,
  deleteItem,
  setDeletedTextbook,
  setLoadingTextbooks,
  isCartItem,
}) {
  const [displayDelete, setDisplayDelete] = useState(false);
  const [myCard, setMyCard] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (
      (cart.cartItemIds && cart.cartItemIds.includes(item.textbookId)) ||
      isCartItem
    ) {
      return setDisplayDelete(true);
    }
    setDisplayDelete(false);
  }, [cart.cartItemIds]);

  useEffect(() => {
    if (user.publicUserInfo) {
      return setMyCard(user.publicUserInfo.userId === item.sellerId);
    }
  }, [user]);

  useEffect(() => {
    if (cart.refreshRequested && user.loggedIn && !cart.pending) {
      getCartItems(user.authToken);
      cart.refreshRequested = false;
    }
  }, [cart.refreshRequested]);

  const handleDeleteCart = () => {
    if (isCartItem) {
      deleteItemFromCart(user.authToken, item.cartItemId);
      item.cartCount -= 1;
    } else {
      deleteItemFromCart(user.authToken, item.textbookId);
      item.cartCount -= 1;
    }
  };

  const handleDelete = () => {
    setLoadingTextbooks(true);
    deleteItem(user.authToken, item.textbookId);
    setDeletedTextbook(true);
  };

  const darkCardBackgroundColor = "rgb(89, 88, 88)";

  // const cartButtonStyles = user.publicUserInfo && item && user.publicUserInfo.userId === item.sellerId ? {}: { display: "none" };

  if (item) {
    return (
      <div
        className="card"
        style={
          darkTheme
            ? { backgroundColor: darkCardBackgroundColor, color: "white" }
            : {}
        }
      >
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
        {adminAccess && (
          <>
            <div
              className="delete-button-container"
              onClick={() => handleDelete()}
            >
              <i className="delete-button-icon-background fas fa-circle"></i>
              <i className="delete-button-icon fas fa-times-circle"></i>
            </div>
            <div
              className="edit-button-container"
              onClick={() => history.push(`/textbooks/edit/${item.textbookId}`)}
            >
              <i className="edit-button-icon-background"></i>
              <i className="edit-button-icon far fa-edit"></i>
            </div>
          </>
        )}
        <div
          id="imageContainer"
          style={darkTheme ? { backgroundColor: darkCardBackgroundColor } : {}}
          style={{ backgroundImage: `url(${item.image})` }}
        ></div>
        <div className="card-body">
          <div className="card-title-container">
            <h5 className="card-title">
              {item.title.length > 35
                ? item.title.substring(0, 35) + "..."
                : item.title}
            </h5>
          </div>
          <hr />
          <div
            className="sellerInfoContainer"
            onClick={() => {
              if (item) history.push(`/textbooks/user/${item.sellerId}`);
            }}
          >
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
            <li
              className="list-group-item"
              style={
                darkTheme ? { backgroundColor: darkCardBackgroundColor } : {}
              }
            >
              <span className="modal-section-title">
                <strong>Used at: </strong>
              </span>
              {item ? item.campus.toUpperCase() : ""}
            </li>
            <li
              className="list-group-item"
              style={
                darkTheme ? { backgroundColor: darkCardBackgroundColor } : {}
              }
            >
              <span className="modal-section-title">
                <strong>Course: </strong>
              </span>
              {item ? item.course.toUpperCase() : ""}
            </li>
            <li
              className="list-group-item"
              style={
                darkTheme ? { backgroundColor: darkCardBackgroundColor } : {}
              }
            >
              <span className="modal-section-title">
                <strong>Approx. Price: </strong>
              </span>
              {`$${item ? item.price : ""}`}
            </li>
            <li
              className="list-group-item"
              style={
                darkTheme ? { backgroundColor: darkCardBackgroundColor } : {}
              }
            >
              <span className="modal-section-title">
                <strong>Desired Exchange Location: </strong>
              </span>
              {item
                ? `${
                    item.sellingLocation.length > 25
                      ? item.sellingLocation.substring(0, 25) + "..."
                      : item.sellingLocation
                  }`
                : ""}
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
            // style={myCard ? { opacity: "0" } : {}}
            disabled={
              myCard || !cart.cartItemIds || displayDelete ? true : false
            }
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
            // style={myCard ? { opacity: "0" } : {}}
            type="button"
            title={`Remove from cart ${
              user.loggedIn ? "" : "(Please login first!)"
            } ${displayDelete ? "" : "(This item is not in your cart!)"}`}
            disabled={!myCard && displayDelete ? false : true}
            onClick={() => {
              handleDeleteCart();
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
    deleteItem: (auth, textbookId) => dispatch(deleteItem(auth, textbookId)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);
