import React, { useEffect, useState } from "react";
import ItemCard from "../ItemShowcase/ItemCard";
import "./UserTextbookShowcase.css";
import { getCartItems } from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";
import { Container, Jumbotron } from "react-bootstrap";
import TextbookModal from "../Modals/TextbookModal";
import axios from "axios";
import CompactItemCard from "../ItemShowcase/CompactItemCard";


axios.defaults.baseURL="https://us-central1-textbook-store-2e072.cloudfunctions.net/api";

function UserTextbookShowcase({
  user,
  settings,
  userId,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null);
  const [adminAccess, setAdminAccess] = useState(false);
  const [loadingTextbooks, setLoadingTextbooks] = useState(true);
  const [thisUsersTextbooks, setThisUsersTextbooks] = useState(null);
  const [deletedTextbook, setDeletedTextbook] = useState(false);

  const [thisUserProfile, setThisUserProfile] = useState({
    userName: "",
    campus: "",
    timeCreated: "",
    userId: "",
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
    const getUserProfile = () => {
      axios
        .get(`/user/${userId}`)
        .then((data) => {
          setThisUserProfile(data.data);
        })
        .catch((err) => console.log(err));
    };
  
    const getUserTextbooks = () => {
      if(userId)
      axios
        .get(`/textbooks/user/${userId}`)
        .then((data) => {
          setLoadingTextbooks(false);
          setThisUsersTextbooks(data.data);
        })
        .catch((err) => console.log(err));
    };


    getUserProfile();
    getUserTextbooks();
  }, [userId]); 


  useEffect(() => {
  
    const getUserTextbooks = () => {
      if(userId)
      axios
        .get(`/textbooks/user/${userId}`)
        .then((data) => {
          setLoadingTextbooks(false);
          setThisUsersTextbooks(data.data);
        })
        .catch((err) => console.log(err));
    };
    // refresh the user's textbooks since one was deleted!
    if (deletedTextbook) {
      getUserTextbooks();
      setDeletedTextbook(false);
    }
  }, [deletedTextbook, userId]); // may have to use callback here

  useEffect(() => {
    if (user.publicUserInfo && userId === user.publicUserInfo.userId)
      setAdminAccess(true);
  }, [user.publicUserInfo, userId]);

  return (
    <div
      style={{
        backgroundColor: settings.settings.darkTheme
          ? "rgb(56,56,56)"
          : "rgb(255,255,255)",
        color: !settings.settings.darkTheme ? "rgb(0,0,0)" : "rgb(255,255,255)",
      }}
    >
      <Jumbotron
        fluid
        className="user-showcase-jumbo"
        style={
          settings.settings.darkTheme
            ? {
                backgroundColor: "rgb(50,50,50)",
                color: "rgb(255,255,255)",
              }
            : {
                color: "rgb(0,0,0)",
              }
        }
      >
        <Container className="jumbo-inner-container">
          {thisUserProfile.userName === "" ||
          !thisUserProfile.profilePicture ? (
            <div className="loader">
              <div className="loaderIcon"></div>
            </div>
          ) : (
            <>
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
                  ? `${thisUserProfile.userName}'s Textbooks`
                  : ""}
              </h1>
            </>
          )}
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
                if (settings.settings.compactCards)
                  return (
                    <CompactItemCard
                      setDeletedTextbook={setDeletedTextbook}
                      adminAccess={adminAccess}
                      key={index}
                      item={item}
                      openModal={openModal}
                      setLoadingTextbooks={setLoadingTextbooks}
                    />
                  );

                return (
                  <ItemCard
                    setDeletedTextbook={setDeletedTextbook}
                    adminAccess={adminAccess}
                    key={index}
                    item={item}
                    openModal={openModal}
                    setLoadingTextbooks={setLoadingTextbooks}
                  />
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
