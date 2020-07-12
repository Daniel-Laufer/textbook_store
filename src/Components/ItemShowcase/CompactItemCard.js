import React, { useState, useEffect } from "react";
import "./CompactItemCard.css";
import {
  addItemToCart,
  deleteItemFromCart,
  getCartItems,
} from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteItem } from "../../Redux/Actions/textbookActions";

function CompactItemCard({
  item,
  openModal,
  addItemToCart,
  deleteItemFromCart,
  user,
  cart,
  getCartItems,
  settings,
  adminAccess,
  deleteItem,
  setDeletedTextbook,
  setLoadingTextbooks,
  isCartItem
}) {
  const [displayDelete, setDisplayDelete] = useState(false);
  const [myCard, setMyCard] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (cart.refreshRequested && user.loggedIn && !cart.pending) {

      getCartItems(user.authToken);
      cart.refreshRequested = false;
    }
  }, [cart.refreshRequested]);

  useEffect(() => {
    if (isCartItem || cart.cartItemIds && cart.cartItemIds.includes(item.textbookId)) {
      return setDisplayDelete(true);
    }
    setDisplayDelete(false);
  }, [cart.cartItemIds]);

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

  useEffect(() => {
    if (user.publicUserInfo) {
      return setMyCard(user.publicUserInfo.userId === item.sellerId);
    }
    setMyCard(false);
  }, []);

  const url =
    "data:image/jpeg;base64,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";
  if (item) {
    return (
      <div
        className="compact-card"
        style={{
          color: !settings.settings.darkTheme
            ? "rgb(0,0,0)"
            : "rgb(255,255,255)",
        }}
      >
        {adminAccess && (
          <>
            <div
              className="compact-delete-button-container"
              onClick={() => handleDelete()}
            >
              <i className="compact-delete-button-icon-background fas fa-circle"></i>
              <i className="compact-delete-button-icon fas fa-times-circle"></i>
            </div>
            <div className="divider"> </div>
          </>
        )}

        <div className="compact-cart-count-container">
          <i
            // style={{ display: item.cartCount === 0 ? "none" : "block" }}
            style={{ color: item.cartCount === 0 ? "gray" : "orange" }}
            className="compact-cart-count-icon fas fa-star"
          ></i>
          <div
            // style={{ display: item.cartCount === 0 ? "none" : "block" }}
            className="compact-cart-count"
          >
            {item ? item.cartCount : 0}
          </div>
        </div>
        <div className="compact-card-title">
          {item.title.length > 35
            ? item.title.substring(0, 35) + "..."
            : item.title}
        </div>
        <div className="divider"> </div>
        <div
          className="compact-seller-info-container"
          onClick={() => {
            if (item) history.push(`/textbooks/user/${item.sellerId}`);
          }}
        >
          <div className="compact-profile-picture-container">
            <img
              className="compact-profile-picture"
              src={`${item.sellerPublicInfo.profilePicture}`}
              alt="profile picture"
            />
          </div>

          <div className="compact-seller-userName">
            {item.sellerPublicInfo.userName}
          </div>
        </div>
        <div className="divider"> </div>
        <div className="compact-campus">
          <div>
            <strong>{item.course.toUpperCase()}</strong> at{" "}
            <strong>{item.campus}</strong>
          </div>
        </div>
        <div className="divider"> </div>
        <div className="compact-price">{`$${item.price}`}</div>
        <div className="divider"> </div>
        <div className="compact-sellingLocation">
          {`Selling Location: ${item.sellingLocation.length > 34 ? item.sellingLocation.substring(0, 34) + '...' : item.sellingLocation}`}
        </div>

        <div className="compact-card-button-holder">
          <button
            title={`Add to cart ${
              user.loggedIn ? "" : "(Please login first!)"
            }`}
            // style={myCard ? { opacity: "0" } : {}}
            disabled={
              myCard || !cart.cartItemIds || displayDelete ? true : false
            }
            onClick={() => {
              addItemToCart(user.authToken, item.textbookId);
              item.cartCount += 1;
              // sendCartRefreshRequest()
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
          >
            <i className="fas fa-info"></i>
          </button>
          <button
            type="button"
            // style={myCard ? { opacity: "0" } : {}}
            title={`Remove from cart ${
              user.loggedIn ? "" : "(Please login first!)"
            } ${displayDelete ? "" : "(This item is not in your cart!)"}`}
            disabled={!myCard && displayDelete ? false : true}
            onClick={() => {
              handleDeleteCart();
            }}
            className="btn btn-danger"
          >
            <i class="far fa-times-circle"></i>
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
    settings: state.settingsReducer,
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
export default connect(mapStateToProps, mapDispatchToProps)(CompactItemCard);
