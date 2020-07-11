import React, { useRef } from "react";
import "./HomePage.css";
import { Link } from "react-scroll";
import { useHistory } from "react-router-dom";

const HomePage = ({ user }) => {
  const myRef = useRef(null);
  const history = useHistory();

  return (
    <div id="home-page-wrapper">
      <div id="page-1">
        <div id="page-1-content">
          <h1>
            {" "}
            Buying textbooks for your university courses made cheaper and
            easier!
          </h1>
          <div id="under-title-text">
            An app that allows for the easy and effective exchange of textbooks
            between students!
          </div>

          <Link to="page-2" smooth={true} duration={1000}>
            Learn More!
          </Link>
        </div>
      </div>

      <div id="page-2">
        <div id="page-2-content">
          <h1>Exchange textbooks across all UofT Campuses!</h1>
          <div className="campuses-container">
            <div className="campus-image">
              <p className="campus-label">UTM</p>
            </div>

            <div className="campus-image">
              <p className="campus-label">UTSG</p>
            </div>

            <div className="campus-image">
              <p className="campus-label">UTSC</p>
            </div>
          </div>
          <p className="campuses-container-description">
            <strong>The Textbook Exchanger</strong> allows for quick and easy
            textbook exchanges regardless of what University of Toronto Campus
            you are currently studying at!
          </p>
        </div>
      </div>
      <div id="page-3">
        <h1>How does it work?</h1>
        <div id="page-3-content">
          <div>
            <div className="list-container">
              <div className="list">
                <h4>To sell a textbook:</h4>
                <hr />
                <ol className="ordered-instructions">
                  <li>Create an account</li>
                  <li>
                    Press the{" "}
                    <button disabled className="plus-icon-span">
                      +
                    </button>{" "}
                    icon in the navigation bar
                  </li>
                  <li>Fill in all the required information</li>
                  <li>You are all set!</li>
                  <li>Await a request for your textbook!</li>
                  <li>
                    manage your post(s) by clicking on your profile then 'My
                    Posts'
                  </li>
                </ol>
              </div>
              <div className="list">
                <h4>To buy a textbook:</h4>
                <hr />
                <ol className="ordered-instructions">
                  <li>Create an account</li>
                  <li>Use the filter to find the textbook(s) you need</li>
                  <li>
                    Press{" "}
                    <button disabled type="button" className="btn btn-primary">
                      <i className="fas fa-star"></i>
                    </button>
                    {"  "} on a textbook to favourite it
                  </li>
                  <li>Contact the seller</li>
                  <li>Await a resposne!</li>
                  <li>
                    Manage favourites by clicking on the{" "}
                    <button disabled type="button" className="btn">
                      <i className="fas fa-star"></i>
                    </button>
                    {"  "}
                    in the navigation bar above.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="page-4">
        <div id="page-4-content">
          <h1>So what are you waiting for? <span rol="img">😄</span></h1>
          <Link to="/signup" onClick={() => history.push("/signup")}>
            Sign me up!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
