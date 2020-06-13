import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, logout } from "../../Redux/Actions/userActions";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./LoginPage.css";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (props.user.loggedIn) {
      localStorage.authToken = props.user.authToken.token;
      localStorage.timeLoggedIn = (new Date()).getTime();
      setEmail("");
      setPassword("");
      if (props.user.error == null) setTimeout(() => history.push("/"), 800);
    }
  }, [props.user]);

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    props.login(email, password);
  };

  return (
    <Container className="form-container">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => handleEmailChange(e)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => handlePasswordChange(e)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {props.user.error ? (
          <Alert variant="danger">Error: {props.user.error.message}</Alert>
        ) : (props.user.loggedIn ? (
          <Alert variant="success">Successfully logged in!</Alert>
        ) : null)}
        <Button
          variant="primary"
          onClick={(e) => {
            handleSubmit(e, email, password);
          }}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
