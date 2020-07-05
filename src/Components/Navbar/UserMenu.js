import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./UserMenu.css";
import { Button } from "react-bootstrap";
import { updateSettings } from "../../Redux/Actions/settingsActions";
import { logout, updateProfilePicture } from "../../Redux/Actions/userActions";
import { useHistory, Link } from "react-router-dom";
import heic2any from "heic2any";

let UserMenu = ({
  setUserMenuOpen,
  user,
  logout,
  hideNav,
  updateProfilePicture,
  darkTheme
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    document.getElementById("root").addEventListener("click", (e) => {
      // if(e.target.)
      console.log(e.target.className);
      const ignore = [
        "user-menu-container",
        "user-menu-profile-pic-container",
        "user-menu-info-container",
        "user-menu-profile-pic",
        "menu-login-logout-button btn btn-primary",
        "user-menu-info-list",
        "menu-userName",
        "menu-campus",
        "change-photo-icon fas fa-camera",
        "user-menu-input",
        "user-menu-input-container",
      ];
      if (
        (e.target.className && !ignore.includes(e.target.className)) ||
        e.target.className === ""
      ) {
        setUserMenuOpen(false);
      }
    });
  }, [setUserMenuOpen]);

  const history = useHistory();

  const handleLogOut = () => {
    setUserMenuOpen(false);
    delete localStorage.authToken;
    logout();
    history.push("/textbooks");
  };

  const handleFileChange = (e) => {
    // console.log(e.target.files[0])
    //{ name: "IMG_2848.HEIC.gif", lastModified: 1593550543093, webkitRelativePath: "", size: 7315216, type: "image/gif" }
    console.log(e.target.files[0]);

    if (
      e.target.files[0].name
        .split(".")
        [e.target.files[0].name.split(".").length - 1].toLowerCase() === "heic"
    ) {
      new Promise((resolve, reject) => {
        heic2any({
          blob: e.target.files[0],
          toType: "image/jpeg",
          quality: 0.4,
        })
          .then(function (resultBlob) {
            const file = new File([resultBlob], "converted.jpg", {
              type: "image/jpeg",
            });
            resolve(file);
          })
          .catch((err) => reject(err));
      })
        .then((data) => {
          setImage(data);
          updateProfilePicture(user, data);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("else");
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div
        className="user-menu-container"
        style={{
          backgroundColor: darkTheme ? "rgb(56,56,56)" : "rgb(255,255,255)",
          color: darkTheme ? "white" : "black",
        }}
      >
        {user.publicUserInfo ? (
          <>
            <div className="user-menu-profile-pic-container">
              <img
                className="user-menu-profile-pic"
                src={user.publicUserInfo.profilePicture}
                alt=""
              />
              <div className="user-menu-input-container">
                <i className="change-photo-icon fas fa-camera"></i>
                <input
                  className="user-menu-input"
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </div>
            <hr />
            <div className="user-menu-info-container">
              <ul className="user-menu-info-list">
                <li className="menu-userName">
                  {user.publicUserInfo.userName}
                </li>
                <li className="menu-campus">{user.publicUserInfo.campus}</li>
              </ul>
            </div>
          </>
        ) : null}
        <div className="user-menu-button-holder">
          {user.loggedIn ? (
            <Button
              className="menu-login-logout-button"
              onClick={() => {
                console.log("clicked");
                handleLogOut();
                hideNav();
              }}
              variant="primary"
            >
              Log out
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    updateProfilePicture: (user, image) =>
      dispatch(updateProfilePicture(user, image)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
