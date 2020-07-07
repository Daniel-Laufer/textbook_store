import React, { useEffect, useState, useCallback } from "react";
import ItemCard from "../ItemShowcase/ItemCard";
import "./UserTextbookShowcase.css";
import { getCartItems } from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";
import { Container, Jumbotron } from "react-bootstrap";
import TextbookModal from "../Modals/TextbookModal";
import axios from "axios";

function UserTextbookShowcase({
  cartItems,
  getCartItems,
  user,
  settings,
  userId,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null);
  const [adminAccess, setAdminAccess] = useState(false);
  const [loadingTextbooks, setLoadingTextbooks] = useState(true);
  const [thisUsersTextbooks, setThisUsersTextbooks] = useState(null);
  const [thisUserProfile, setThisUserProfile] = useState({
    userName: "",
    campus: "",
    timeCreated: "",
    userId: "",
    userName: "",
  });

  function openModal(item) {
    setFocusedItem(item);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
    return null;
  }

  useEffect(() => {
    console.log(loadingTextbooks);
    // get their textbooks
    axios
      .get(`/user/${userId}`)
      .then((data) => {
        setThisUserProfile(data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/textbooks/${userId}`)
      .then((data) => {
        setLoadingTextbooks(false);
        setThisUsersTextbooks(data.data);
      })
      .catch((err) => console.log(err));

    // get their usernames (this may seem like a redundant step since we could just pull
    // the username from one of the textbooks, however, there is a change this user could have not posted anything yet!)
  }, []);

  // const updateAdminAccess = useCallback(() => {
  //   if(user.publicUserInfo && userId === user.publicUserInfo.userId){
  //     setAdminAccess(true)
  //   }
  // }, [user.publicUserInfo])

  useEffect(() => {
    if (user.publicUserInfo && userId === user.publicUserInfo.userId)
      setAdminAccess(true);
  }, [user.publicUserInfo]);

  return (
    <div
      style={{
        backgroundColor: settings.settings.darkTheme
          ? "rgb(56,56,56)"
          : "rgb(255,255,255)",
      }}
    >
      <Jumbotron fluid className="user-showcase-jumbo">
        <Container className="jumbo-inner-container">
          <img
            className="user-showcase-profile-pic"
            src={
              !thisUserProfile.profilePicture
                ? ""
                : thisUserProfile.profilePicture
            }
            alt=""
          />
          <h1>
            {thisUserProfile.userName !== ""
              ? `${thisUserProfile.userName}\'s Textbooks`
              : ""}
          </h1>
        </Container>
      </Jumbotron>
      {thisUsersTextbooks ? (
        <Container
          style={{
            backgroundColor: settings.settings.darkTheme
              ? "rgb(56,56,56)"
              : "rgb(255,255,255)",
          }}
        >
          <div className="user-textbook-showcase">
            {thisUsersTextbooks.length === 0 ? (
              <div id="empty-cart-message">
                <h1>
                  {adminAccess ? "You haven't " : "This user hasn't "}posted any
                  textbooks!
                </h1>
              </div>
            ) : (
              thisUsersTextbooks.map((item, index) => {
                return (
                  <ItemCard canDelete={adminAccess} key={index} item={item} openModal={openModal} />
                );
              })
            )}

            <TextbookModal
              funcs={{ modalIsOpen, openModal, afterOpenModal, closeModal }}
              item={focusedItem}
            />
          </div>
        </Container>
      ) : (
        <></>
      )}
      <div
        style={{ display: loadingTextbooks ? "block" : "none" }}
        className="loader"
      >
        <div style={{ top: "400px" }} className="loaderIcon"></div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer, // the names you gave in the combine reducers method call
    cartItems: state.cartReducer,
    textbooks: state.textbooksReducer,
    settings: state.settingsReducer,
  };
};

// similar to above. What actions do I want to use in this module? note: dispatch gets pass
//-ed automatically
const mapDispatchToProps = (dispatch) => {
  return {
    getCartItems: (authToken) => dispatch(getCartItems(authToken)),
  };
};

// connects react with redux!
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTextbookShowcase);
