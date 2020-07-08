import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./TextbookModal.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

Modal.setAppElement("#root");

Modal.defaultStyles.overlay.backgroundColor = "rgba(89,89,89, 0.75)";

const darkCardBackgroundColor = "rgb(89, 88, 88)";

export default function TextbookModal({ funcs, item, darkTheme, cart }) {
  const handWritingLabels = {
    0: "None.",
    50: "Only a little",
    100: "It's everwhere!",
  };
  const [qualityOfTextbooks, setQualityOfTextbooks] = useState(null);

  const showContactInfo =
    !cart || !cart.cartItemIds || !item
      ? false
      : cart.cartItemIds.includes(item.textbookId);

  // alert(showContactInfo)

  useEffect(() => {
    if (item) {
      assignQualityLabels();
    }
  }, [item]);

  const getLevelColor = (num) => {
    if (num >= 0 && num < 25) return "green";
    else if (num >= 25 && num < 50) return "rgb(128, 171, 43)";
    else if (num >= 50 && num < 75) return "orange";
    else if (num >= 75 && num <= 100) return "red";
    else return "purple";
  };
  const getLevelMessage = (num, type) => {
    if (num >= 0 && num < 25) {
      return { message: "none", level: <span rol="img">😄</span> };
    } else if (num >= 25 && num < 50) {
      const out = { level: <span rol="img">🙂</span> };
      switch (type) {
        case "handWriting":
          out["message"] = "on a few pages";
          return out;
        case "stains":
          out["message"] = "one or two little ones";
          return out;
        case "pagesMissing":
          out["message"] = "one or two...";
          return out;
        default:
          out["message"] = "";
          return out;
      }
    } else if (num >= 50 && num < 75) {
      const out = { level: <span rol="img">😔</span> };
      switch (type) {
        case "handWriting":
          out["message"] = "on several pages";
          return out;
        case "stains":
          out["message"] = "several stains exist";
          return out;
        case "pagesMissing":
          out["message"] = "several are missing";
          return out;
        default:
          out["message"] = "";
          return out;
      }
    } else if (num >= 75 && num <= 100) {
      const out = { level: <span rol="img">😨</span> };
      switch (type) {
        case "handWriting":
          out["message"] = "everywhere!";
          return out;
        case "stains":
          out["message"] = "stains everwhere";
          return out;
        case "pagesMissing":
          out["message"] = "many are missing";
          return out;
        default:
          out["message"] = "";
          return out;
      }
    }
  };

  const assignQualityLabels = () => {
    let qualityOfTextbooks = {};
    let keys = Object.keys(item.textbookQuality);
    for (const key in keys) {
      qualityOfTextbooks[keys[key]] = {
        color: getLevelColor(item.textbookQuality[keys[key]]),
        data: getLevelMessage(item.textbookQuality[keys[key]], keys[key]),
      };
    }
    setQualityOfTextbooks(qualityOfTextbooks);
  };

  const isOverflown = ({
    clientWidth,
    clientHeight,
    scrollWidth,
    scrollHeight,
  }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  };

  useEffect(() => {
    if (funcs.modalIsOpen) {
      setTimeout(
        () => {
          const modalRef = document.getElementsByClassName("textbook-modal")[0];
          if (isOverflown(modalRef))
            modalRef.addEventListener("scroll", () =>
              modalRef.scrollTop > 0 ? setScrolled(true) : setScrolled(false)
            );
          else setScrolled(true);
        },

        100
      );

    }
  }, [funcs.modalIsOpen]);

  const [scrolled, setScrolled] = useState(false);
  return item ? (
    <Modal
      id="yes"
      className="textbook-modal"
      isOpen={funcs.modalIsOpen}
      onAfterOpen={funcs.afterOpenModal}
      onRequestClose={() => {
        setScrolled(false);
        funcs.closeModal();
      }}
      contentLabel="Example Modal"
    >
      <button
        type="button"
        onClick={funcs.closeModal}
        className="btn btn-danger close-modal-button"
      >
        X
      </button>
      <div className="modal-image-container">
        <img
          draggable={false}
          className="modal-image"
          src={
            item
              ? item.image
              : "https://static.thenounproject.com/png/212328-200.png"
          }
          alt="A textbook!"
        />
      </div>
      <div
        className="modal-data-container"
        style={{
          backgroundColor: darkTheme
            ? darkCardBackgroundColor
            : "rgb(255,255,255)",
          color: darkTheme ? "white" : "black",
        }}
        onScroll={() => {
          setScrolled(true);
        }}
      >
        <div className="title-info-container">
          <h2 className="modal-title">{item ? item.title : "null"}</h2>
        </div>
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item"
            style={{
              backgroundColor: darkTheme
                ? darkCardBackgroundColor
                : "rgb(255,255,255)",
              color: darkTheme ? "white" : "black",
            }}
          >
            <span className="modal-section-title">
              <strong>Used at: </strong>
            </span>
            {item ? item.campus.toUpperCase() : ""}
          </li>
          <li
            className="list-group-item"
            style={{
              backgroundColor: darkTheme
                ? darkCardBackgroundColor
                : "rgb(255,255,255)",
              color: darkTheme ? "white" : "black",
            }}
          >
            <span className="modal-section-title">
              <strong>Course: </strong>
            </span>
            {item ? item.course.toUpperCase() : ""}
          </li>
          <li
            className="list-group-item"
            style={{
              backgroundColor: darkTheme
                ? darkCardBackgroundColor
                : "rgb(255,255,255)",
              color: darkTheme ? "white" : "black",
            }}
          >
            <span className="modal-section-title">
              <strong>Pickup Location: </strong>
            </span>
            {item ? item.sellingLocation : ""}
          </li>
          <li
            className="list-group-item contact-modal-container"
            style={{
              backgroundColor: darkTheme
                ? darkCardBackgroundColor
                : "rgb(255,255,255)",
              color: darkTheme ? "white" : "black",
            }}
          >
            <span className="modal-section-title">
              <strong>Contact Information</strong>
              <br />
            </span>
            <div style={showContactInfo ? {} : { display: "none" }}>
              {item.sellerPublicInfo.name ? (
                <div>
                  <strong>Name: </strong>
                  <span>{item.sellerPublicInfo.name}</span>
                </div>
              ) : (
                <span role={"img"} aria-label={"hidden"}>
                  <strong>Name: </strong>🔒
                </span>
              )}
              {item.sellerPublicInfo.email ? (
                <div>
                  <strong>Email: </strong> {item.sellerPublicInfo.email}
                </div>
              ) : (
                <span role={"img"} aria-label={"hidden"}>
                  <strong>Email: </strong>🔒
                </span>
              )}
              {item.sellerPublicInfo.phoneNumber ? (
                <div>
                  <strong>Phone Number: </strong>{" "}
                  {item.sellerPublicInfo.phoneNumber}
                </div>
              ) : (
                <span role={"img"} aria-label={"hidden"}>
                  <strong>Phone Number: </strong> 🔒
                </span>
              )}
            </div>
            <div style={!showContactInfo ? {} : { display: "none" }} className="not-in-cart-contact-locked">
              <span
                role={"img"}
                aria-label={"hidden"}
                
              >
                🔒<br/>
              </span>
              <span className="locked-contact-message">Star this item to view this information!</span>
            </div>
          </li>
          <li
            className="list-group-item"
            style={{
              backgroundColor: darkTheme
                ? darkCardBackgroundColor
                : "rgb(255,255,255)",
              color: darkTheme ? "white" : "black",
            }}
          >
            {qualityOfTextbooks ? (
              <>
                <span className="modal-section-title">
                  <strong>Textbook Quality</strong>
                </span>
                <div>
                  Handwriting:
                  <strong>
                    <span
                      style={{
                        color: qualityOfTextbooks
                          ? qualityOfTextbooks.handWriting.color
                          : "purple",
                      }}
                    >
                      {"   "}
                      {qualityOfTextbooks.handWriting.data.message}{" "}
                      {qualityOfTextbooks.handWriting.data.level}
                    </span>
                  </strong>
                </div>
                <div>
                  Stains:
                  <strong>
                    <span
                      style={{
                        color: qualityOfTextbooks
                          ? qualityOfTextbooks.stains.color
                          : "purple",
                      }}
                    >
                      {"   "}
                      {qualityOfTextbooks.stains.data.message}{" "}
                      {qualityOfTextbooks.stains.data.level}
                    </span>
                  </strong>
                </div>
                <div>
                  Pages Missing:
                  <strong>
                    <span
                      style={{
                        color: qualityOfTextbooks
                          ? qualityOfTextbooks.pagesMissing.color
                          : "purple",
                      }}
                    >
                      {" "}
                      {"   "}
                      {qualityOfTextbooks.pagesMissing.data.message}{" "}
                      {qualityOfTextbooks.pagesMissing.data.level}
                    </span>
                  </strong>
                </div>
              </>
            ) : (
              <></>
            )}
          </li>
          <li
            className="list-group=item"
            style={{
              backgroundColor: darkTheme
                ? darkCardBackgroundColor
                : "rgb(255,255,255)",
              color: darkTheme ? "white" : "black",
            }}
          >
            <span className="modal-section-title">
              <strong>Additional Notes</strong>
            </span>
            <p>{item ? item.description : "null"}</p>
          </li>
        </ul>
      </div>
      <img
        style={scrolled ? { display: "none" } : { display: "block" }}
        id="scroll-down-gif"
        draggable={false}
        src="https://firebasestorage.googleapis.com/v0/b/textbook-store-2e072.appspot.com/o/App_images_and_gifs%2FscrollGIf.gif?alt=media&token=934531ef-cf7f-4981-a207-eea276365a0f"
        alt="scroll down"
      />
    </Modal>
  ) : null;
}
