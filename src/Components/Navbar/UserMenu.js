import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./UserMenu.css";
import { Button } from "react-bootstrap";
import { updateSettings } from "../../Redux/Actions/settingsActions";
import { logout } from "../../Redux/Actions/userActions";
import { useHistory, Link } from "react-router-dom";

let UserMenu = ({ setUserMenuOpen, user, logout, hideNav }) => {
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

  return (
    <>
      <div className="user-menu-container">
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
                <input className="user-menu-input" type="file" />
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
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
