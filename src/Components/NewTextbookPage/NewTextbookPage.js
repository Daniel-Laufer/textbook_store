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
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { createNewTextbook } from "../../Redux/Actions/textbookActions";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./NewTextbookPage.css";

const animatedComponents = makeAnimated();

function NewTextbookPage({ textbooks, user, createNewTextbook }) {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [campus, setCampus] = useState("");
  const [privacySettings, setPrivacySettings] = useState({
    Name: true,
    "Phone Number": true,
    Email: true,
  });
  const [sellingLocation, setSellingLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitError, setSubmitError] = useState(null);

  const [pagesMissing, setPagesMissing] = useState(Math.floor(Math.random() * 100));
  const [handWriting, setHandWriting] = useState(Math.floor(Math.random() * 100));
  const [stains, setStains] = useState(Math.floor(Math.random() * 100));
  const pagesMissingLabels = {
    0: "None.",
    50: "Just a few...",
    100: "Quite a few!",
  };
  const handWritingLabels = {
    0: "None.",
    50: "Only a little",
    100: "It's everwhere!",
  };
  const stainsLabels = {
    0: "None.",
    50: "Just a few little ones...",
    100: "Many stains or one giant stain",
  };

  const campuses = [
    { value: "UTM", label: "UTM" },
    { value: "UTSG", label: "UTSG" },
    { value: "UTSC", label: "UTSC" },
  ];

  const privacyOptions = [
    { value: true, label: "Phone Number" },
    { value: "lauferkdaniel@gmail.com", label: "Email" },
    { name: "name", label: "Name" },
  ];

  const handleSelectChange = (items, type) => {
    switch (type) {
      case "privacy":
        if (!items) {
          return setPrivacySettings({
            Name: false,
            "Phone Number": false,
            Email: false,
          });
        }
        const active = items.map((item) => {
          return item.label;
        });
        const newPrivacySettings = {
          Name: true,
          "Phone Number": true,
          Email: true,
        };
        ["Name", "Phone Number", "Email"].forEach((item) => {
          active.includes(item)
            ? (newPrivacySettings[item] = true)
            : (newPrivacySettings[item] = false);
        });
        return setPrivacySettings(newPrivacySettings);
      case "campus":
        setCampus(items ? items.value : null);
        break;
      default:
        console.log("error!");
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (textbooks.error === null && textbooks.refreshRequired)
      setTimeout(() => history.push("/"), 2000);
  }, [textbooks.refreshRequired, history, textbooks.error]); // added history and textbooks.err dependences here, not sure if it makes a difference!

  const handleTextInputChange = (e, inputType) => {
    switch (inputType) {
      case "price":
        setPrice(e.target.value);
        break;
      case "title":
        setTitle(e.target.value);
        break;
      case "course":
        setCourse(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "location":
        setSellingLocation(e.target.value);
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      [image, title, price, course, sellingLocation, campus].some(
        (item) => item === "" || item === null
      )
    ) {
      // if (image === null || description === "" || title === "" || price === "" }} ) {
      return setSubmitError("An input field is empty!");
    } else if (isNaN(price)) {
      return setSubmitError("The price is not a number!");
    } else if (!(privacySettings.Email || privacySettings["Phone Number"])) {
      return setSubmitError(
        "Please provide at least one piece of contact information! (email and/or phone number)!"
      );
    }
    createNewTextbook(user, image, description, title, price, course, campus, sellingLocation, pagesMissing, handWriting, stains, privacySettings);
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

        <Form.Row>
          <Form.Group as={Col} controlId="exampleForm.ControlInput1">
            <Form.Label>Which course uses this textbook?</Form.Label>
            <Form.Control
              type="text"
              placeholder="CSC148"
              value={course}
              onChange={(e) => handleTextInputChange(e, "course")}
            />
          </Form.Group>
          {/* onChange={(item) => handleFilterChange(item, "campus")} */}

          <Form.Group as={Col} controlId="exampleForm.ControlInput1">
            <Form.Label>Desired Exchange Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Calculus: Early Transcendentals"
              value={sellingLocation}
              onChange={(e) => handleTextInputChange(e, "location")}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Which UofT campus is this textbook used at?</Form.Label>
          <Select
            placeholder="Campus"
            isClearable={true}
            onChange={(items) => handleSelectChange(items, "campus")}
            options={campuses}
          />
        </Form.Group>
        <div id="slider-container">
          <Form.Group>
            <Form.Label>How many pages are missing?</Form.Label>
            <Slider
              tooltip={false}
              className="slider"
              min={0}
              max={100}
              value={pagesMissing}
              labels={pagesMissingLabels}
              onChange={(val) => setPagesMissing(val)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>How much of your own handwriting is in it?</Form.Label>
            <Slider
              tooltip={false}
              className="slider"
              min={0}
              max={100}
              value={handWriting}
              labels={handWritingLabels}
              onChange={(val) => setHandWriting(val)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>How many stains does it have?</Form.Label>
            <Slider
              tooltip={false}
              className="slider"
              min={0}
              max={100}
              value={stains}
              labels={stainsLabels}
              onChange={(val) => setStains(val)}
            />
          </Form.Group>
        </div>

        <Form.Group>
          <Form.Label>
            Contact Information (at least one option from the following list{" "}
            <strong> must</strong> be selected: ['Phone Number', 'Email'])
          </Form.Label>
          <Select
            onChange={(items) => handleSelectChange(items, "privacy")}
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={privacyOptions}
            defaultValue={[
              { value: "905-501-8458", label: "Phone Number" },
              { value: "lauferkdaniel@gmail.com", label: "Email" },
              { name: "name", label: "Name" },
            ]}
            isMulti
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Additional Notes</Form.Label>
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
        {textbooks.error || submitError ? (
          <Alert variant="danger">
            Error: {textbooks.error || submitError}
          </Alert>
        ) : !textbooks.uploadPending &&
          textbooks.refreshRequired &&
          user.loggedIn ? (
          <Alert variant="success">Success!</Alert>
        ) : null}
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
    textbooks: state.textbooksReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewTextbook: (user, image, description, title, price, course, campus, sellingLocation, pagesMissing, handWriting, stains, privacySettings) =>
      dispatch(createNewTextbook(user, image, description, title, price, course, campus, sellingLocation, pagesMissing, handWriting, stains, privacySettings)),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(NewTextbookPage);
