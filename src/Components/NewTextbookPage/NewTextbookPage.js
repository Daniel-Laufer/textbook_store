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
import {
  createNewTextbook,
  updateTextbook,
} from "../../Redux/Actions/textbookActions";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./NewTextbookPage.css";
import courseData from "../ItemShowcase/Filters/FilterContainer/courseData";
import heic2any from "heic2any";
import axios from "axios";

axios.defaults.baseURL =
  "https://us-central1-textbook-store-2e072.cloudfunctions.net/api";

const animatedComponents = makeAnimated();

function NewTextbookPage({
  textbooks,
  user,
  createNewTextbook,
  darkTheme,
  edit,
  updateTextbook,
  textbookId,
}) {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(false); // boolean value that states whether or not we uploaded a new image
  const [oldImageURL, setOldImageURL] = useState(null); // boolean value that states whether or not we uploaded a new image
  const [price, setPrice] = useState("");
  const [convertingImage, setConvertingImage] = useState(false);
  const [errorConvertingImage, setErrorConvertingImage] = useState(false);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState(null);

  const [courses, setCourses] = useState(null);
  const [coursePrefixFilter, setCoursePrefixFilter] = useState(null);
  const [coursePrefixes, setCoursePrefixes] = useState(null);

  const [campus, setCampus] = useState("");
  const [privacySettings, setPrivacySettings] = useState({
    Name: true,
    "Phone Number": true,
    Email: true,
  });
  const [sellingLocation, setSellingLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitError, setSubmitError] = useState(null);

  const [pagesMissing, setPagesMissing] = useState(
    Math.floor(Math.random() * 100)
  );
  const [handWriting, setHandWriting] = useState(
    Math.floor(Math.random() * 100)
  );
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
    { value: "name", label: "Name" },
  ];

  useEffect(() => {
    setCourses({});

    let coursePrefixes = [];
    for (let i = 0; i < courseData.coursePrefixes.length; i++) {
      let course = courseData.coursePrefixes[i];
      let toAppend = {
        value: course.toLowerCase(),
        label: course.toUpperCase(),
      };
      coursePrefixes.push(toAppend);
    }
    setCoursePrefixes(coursePrefixes);

    if (!oldImageURL && edit && textbookId && coursePrefixes) {
      axios
        .get(`/textbooks/${textbookId}`)
        .then((data) => {
          for (let i = 0; i < coursePrefixes.length; i++) {
            if (
              coursePrefixes[i].label.toLowerCase() ===
              data.data.course.substring(0, 3).toLowerCase()
            ) {
              setCoursePrefixFilter(coursePrefixes[i]);
              break;
            }
          }
          setCourse({
            label: data.data.course.toUpperCase(),
            value: data.data.course,
          });
          setOldImageURL(data.data.image);
          setPrice(data.data.price);
          setStains(data.data.textbookQuality.stains);
          setHandWriting(data.data.textbookQuality.handWriting);
          setPagesMissing(data.data.textbookQuality.pagesMissing);
          setPrivacySettings(data.data.privacySettings);
          setTitle(data.data.title);
          setDescription(data.data.description);
          setSellingLocation(data.data.sellingLocation);
          setCampus({ label: data.data.campus, value: data.data.campus });
        })
        .catch((err) => console.log(err));
    }
  }, [oldImageURL, edit, textbookId]);

  // filter out the unecessary courses
  useEffect(() => {
    if (coursePrefixFilter) {
      let courses = [];
      for (let i = 0; i < courseData.courses.length; i++) {
        let course = courseData.courses[i];
        let upperCaseCourse = course.toUpperCase();
        if (
          upperCaseCourse.startsWith(coursePrefixFilter.value.toUpperCase())
        ) {
          let toAppend = {
            value: course.toLowerCase(),
            label: upperCaseCourse,
          };
          courses.push(toAppend);
        }
      }
      setCourses(courses);
    }
  }, [coursePrefixFilter, edit, user.publicUserInfo]);

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
        setCampus(items ? items : null);
        break;
      case "coursePrefix":
        setCoursePrefixFilter(items ? items : null);
        break;
      case "course":
        setCourse(items ? items : null);
        break;
      default:
        return null;
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (!edit && textbooks.error === null && textbooks.refreshRequired)
      setTimeout(() => history.push("/textbooks"), 2000);
    else if (
      edit &&
      textbooks.error === null &&
      textbooks.refreshRequired &&
      user.publicUserInfo
    )
      setTimeout(
        () => history.push(`/textbooks/user/${user.publicUserInfo.userId}`),
        2000
      );
  }, [
    textbooks.refreshRequired,
    history,
    textbooks.error,
    edit,
    user.publicUserInfo,
  ]); // added history and textbooks.err dependences here, not sure if it makes a difference!

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
      case "location":
        setSellingLocation(e.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    const supportedFileFormats = [
      "jpg",
      "jpeg",
      "png",
      "apng",
      "bmp",
      "jfif",
      "pjpeg",
      "svg",
    ];
    e.preventDefault();
    if (
      !newImage &&
      edit &&
      [oldImageURL, title, price, course, sellingLocation, campus].some(
        (item) => item === "" || item === null
      )
    ) {
      return setSubmitError("An input field is empty!");
    } else if (
      newImage &&
      [image, title, price, course, sellingLocation, campus].some(
        (item) => item === "" || item === null
      )
    ) {
      // if (image === null || description === "" || title === "" || price === "" }} ) {
      return setSubmitError("An input field is empty!");
    } else if (isNaN(price)) {
      return setSubmitError("The price is not a number!");
    } else if (
      !edit &&
      !supportedFileFormats.includes(
        image.name.split(".")[image.name.split(".").length - 1].toLowerCase()
      )
    ) {
      return setSubmitError("That image type is not supported!");
    } else if (!(privacySettings.Email || privacySettings["Phone Number"])) {
      return setSubmitError(
        "Please provide at least one piece of contact information! (email and/or phone number)!"
      );
    } else if (newImage && errorConvertingImage) {
      return setSubmitError(
        "There was an error converting your image to a usable file format. Please try a different image or try the saem one gain later."
      );
    } else if (newImage && convertingImage) {
      return setSubmitError(
        "Image is still converting to a usable file format. Please wait a couple more seconds."
      );
    }

    if (!edit)
      return createNewTextbook(
        user,
        image,
        description,
        title,
        price,
        course.value,
        campus.value,
        sellingLocation,
        pagesMissing,
        handWriting,
        stains,
        privacySettings
      );
    return updateTextbook(
      user,
      image,
      description,
      title,
      price,
      course.value,
      campus.value,
      sellingLocation,
      pagesMissing,
      handWriting,
      stains,
      privacySettings,
      newImage,
      oldImageURL,
      textbookId
    );
  };

  const handleFileChange = (e) => {
    setNewImage(true);
    if (
      e.target.files[0].name
        .split(".")
        [e.target.files[0].name.split(".").length - 1].toLowerCase() === "heic"
    ) {
      setConvertingImage(true);
      setErrorConvertingImage(false);
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
          setConvertingImage(false);
        })
        .catch((err) => {
          setConvertingImage(false);
          setErrorConvertingImage(true);
        });
    } else {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div
      style={{
        backgroundColor: darkTheme ? "rgb(56,56,56)" : "rgb(255,255,255)",
      }}
    >
      <Container
        className="form-container"
        style={{
          color: darkTheme ? "white" : "black",
        }}
      >
        {edit ? <h1>Edit Post</h1> : <h1>New Post</h1>}

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
              <Form.Label>
                Which academic department uses this textbook? Please select its
                corresponding course prefix:
              </Form.Label>
              <Select
                value={coursePrefixFilter}
                placeholder="CSC"
                onChange={(items) => handleSelectChange(items, "coursePrefix")}
                isClearable={true}
                className="select"
                options={coursePrefixes}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
              <Form.Label>
                Which course uses this textbook? Please finish answering the
                previous question first{" "}
                <span role={"img"} aria-label="winky face">
                  😉
                </span>
              </Form.Label>
              <Select
                isDisabled={coursePrefixFilter ? false : true}
                placeholder="Course"
                onChange={(items) => handleSelectChange(items, "course")}
                isClearable={true}
                className="select"
                options={courses}
                value={course}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>Desired Exchange Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="At square one mall"
              value={sellingLocation}
              onChange={(e) => handleTextInputChange(e, "location")}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Which UofT campus is this textbook used at?</Form.Label>
            <Select
              placeholder="Campus"
              isClearable={true}
              onChange={(items) => handleSelectChange(items, "campus")}
              options={campuses}
              value={campus}
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
              <Form.Label>
                How much of your own handwriting is in it?
              </Form.Label>
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
                { value: "name", label: "Name" },
              ]}
              isMulti
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Additional Notes</Form.Label>
            <Form.Control
              value={description}
              placeholder={
                "ex. I will only be able exchange the textbook on weekends..."
              }
              onChange={(e) => handleTextInputChange(e, "description")}
              as="textarea"
              rows="3"
            />
          </Form.Group>
          <Form.Group>
            <Form.File 
              id="exampleFormControlFile1"
              label="Example file input"
              onChange={(e) => handleFileChange(e)}
            />
          </Form.Group>

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
            onClick={(e) => {
              handleSubmit(e);
            }}
            type="submit"
            variant="primary"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
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
    createNewTextbook: (
      user,
      image,
      description,
      title,
      price,
      course,
      campus,
      sellingLocation,
      pagesMissing,
      handWriting,
      stains,
      privacySettings
    ) =>
      dispatch(
        createNewTextbook(
          user,
          image,
          description,
          title,
          price,
          course,
          campus,
          sellingLocation,
          pagesMissing,
          handWriting,
          stains,
          privacySettings
        )
      ),
    updateTextbook: (
      user,
      image,
      description,
      title,
      price,
      course,
      campus,
      sellingLocation,
      pagesMissing,
      handWriting,
      stains,
      privacySettings,
      newImage,
      oldImageURL,
      textbookId
    ) =>
      dispatch(
        updateTextbook(
          user,
          image,
          description,
          title,
          price,
          course,
          campus,
          sellingLocation,
          pagesMissing,
          handWriting,
          stains,
          privacySettings,
          newImage,
          oldImageURL,
          textbookId
        )
      ),
  };
};

// connects react with redux!
export default connect(mapStateToProps, mapDispatchToProps)(NewTextbookPage);
