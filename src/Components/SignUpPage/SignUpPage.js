import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, signUp } from "../../Redux/Actions/userActions";

import {
  Form,
  Button,
  Container,
  Alert,
  InputGroup,
  FormControl,
  Col,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import "./SignUpPage.css";

const SignUpPage = ({ user, signUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [campus, setCampus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (user.loggedIn) {
      localStorage.authToken = user.authToken.token;
      localStorage.timeLoggedIn = new Date().getTime();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setError("");
      setUsername("");
      if (user.error == null) setTimeout(() => history.push("/textbooks"), 800);
    }
  }, [user, history]); // added history here

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    signUp(email, password, name, username, phoneNumber, campus);
  };

  const campuses = [
    { value: "UTM", label: "UTM" },
    { value: "UTSG", label: "UTSG" },
    { value: "UTSC", label: "UTSC" },
  ];

  return (
    <Container className="form-container">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Username</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder=""
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlInput1">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>UofT Campus</Form.Label>
            <Select
              placeholder="Campus"
              isClearable={true}
              onChange={(item) => setCampus(item.value)}
              options={campuses}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autocomplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {user.error ? (
          <Alert variant="danger">Error: {user.error.message}</Alert>
        ) : user.loggedIn ? (
          <Alert variant="success">Successfully signed up!</Alert>
        ) : null}
        {error ? <Alert variant="danger">Error: {error}</Alert> : null}
        <Button
          variant="primary"
          onClick={(e) => {
            handleSubmit(e);
          }}
          disabled={user.pending}
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
    signUp: (email, password, name, username, phoneNumber, campus) =>
      dispatch(signUp(email, password, name, username, phoneNumber, campus)),
    login: (email, password) => dispatch(login(email, password)),
    
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
