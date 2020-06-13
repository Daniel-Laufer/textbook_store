import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Form,
  Button,
  Container,
  Alert,
  InputGroup,
  FormControl,
  Col,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {createNewTextbook} from "../../Redux/Actions/textbookActions";

function NewTextbookPage({ textbooks, user, createNewTextbook}) {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitError, setSubmitError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if(textbooks.error === null && textbooks.refreshRequired)
    setTimeout(() => history.push("/"), 2000); 
  }, [textbooks.refreshRequired])


  const handleTextInputChange = (e, inputType) => {
    switch (inputType) {
      case "price":
        setPrice(e.target.value);
        break;
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(image === null || description === '' || title === '' || price === ''){
      return setSubmitError("Error!");
    }
    createNewTextbook(user, image, description, title, price);
    
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Container className="form-container">
      <h1>New Post</h1>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Calculus: Early Transcendentals"
              value={title}
              onChange={(e) => handleTextInputChange(e, "title")}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Price</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) => handleTextInputChange(e, "price")}
                value={price}
                aria-label="Amount (to the nearest dollar)"
                placeholder="79.99"
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => handleTextInputChange(e, "description")}
            as="textarea"
            rows="3"
          />
        </Form.Group>
        <Form>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Example file input"
              onChange={(e) => handleFileChange(e)}
            />
          </Form.Group>
        </Form>
        {textbooks.error || submitError  ? (
            <Alert variant="danger">Error: {textbooks.error || submitError}</Alert>
          ) : (!textbooks.uploadPending && textbooks.refreshRequired ? (
            <Alert variant="success">Success!</Alert>
          ) : null)}
        <Button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          variant="primary"
        >
          Submit
        </Button>
      </Form>

    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    textbooks: state.textbooksReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewTextbook: (user, image, description, title, price) => dispatch(createNewTextbook(user, image, description, title, price))
  };
};


// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(NewTextbookPage);
