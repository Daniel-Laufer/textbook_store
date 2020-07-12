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
    if (isCartItem || (cart.cartItemIds && cart.cartItemIds.includes(item.textbookId))) {
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
              alt="profile"
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
