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

function NewTextbookPage({ user }) {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  console.log(image, title, price, description);

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
    const headers = {
      // 'Authorization': `Bearer ${authToken === null ? 1: authToken.token}`
      Authorization: `Bearer ${user.authToken.token}`,
    };

    const formData = new FormData();
    formData.append("file", image);

    let imageURL;
    axios
      .post(
        "http://localhost:5000/textbook-store-2e072/us-central1/api/image/Textbook_Images",
        formData,
        { headers }
      )
      .then((res) => {
        imageURL = res.data.url;
        const otherData = { description, title, price, imageURL };
        axios
          .post(
            "http://localhost:5000/textbook-store-2e072/us-central1/api/createTextbook",
            { otherData },
            { headers }
          )
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log("ye");
        console.log(err);
      });
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
  };
};

// connects react with redux!
export default connect(mapStateToProps, null)(NewTextbookPage);
