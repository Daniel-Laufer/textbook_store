import React, { useEffect } from "react";
// import * as data from "../../StoreData/itemData.json";
import AppNav from "../Navbar/Navbar"
import "../Navbar/Navbar.css";

import {connect } from "react-redux";
import { increment } from "../../Redux/Actions/countActions";
import { login, setAge } from "../../Redux/Actions/userActions";
import { getTextbooks } from "../../Redux/Actions/textbookActions";



function App(props) {
// 
  useEffect(() => {
    props.getTextbooks()
    // props.setAge(151235)
    // axios.get("/textbooks").then(res => {console.log(res.data)}).catch(err => console.log(err))
    // axios.get("/textbooks").then(res => {console.log(res.data)}).catch(err => console.log(err))
  }, []);

  return (
    <AppNav/>
  );
}

// which parts of the global state do I want to use here (found in App's props)?
// state gets automatically passed
const mapStateToProps = (state) => {
  return {
    user: state.userReducer, // the names you gave in the combine reducers method call
    count: state.countReducer,
    textbooks: state.textbooksReducer,
  };
};

// similar to above. What actions do I want to use in this module? note: dispatch gets pass
//-ed automatically
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()), // the names you gave in the combine reducers method call
    increment: (amount) => dispatch(increment(amount)),
    setAge: (age) => dispatch(setAge(age)),
    getTextbooks: () => dispatch(getTextbooks())
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(App);
