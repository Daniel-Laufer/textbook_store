import React, {useRef} from "react";
import "./HomePage.css";
import {Link} from "react-scroll"

const HomePage = () => {
    const myRef = useRef(null)


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
          
          <Link to="page-2" smooth={true} duration={1000}>Learn More!</Link>
          
        </div>
      </div>
      <div id="page-2"></div>
    </div>
  );
};

export default HomePage;
