import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./TextbookModal.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

Modal.setAppElement("#root");

export default function TextbookModal({ funcs, item }) {
  const handWritingLabels = {
    0: "None.",
    50: "Only a little",
    100: "It's everwhere!",
  };
  const [qualityOfTextbooks, setQualityOfTextbooks] = useState(null);

  useEffect(() => {
    if (item) {
      assignQualityLabels();
    }
  }, [item]);

  const getLevelColor = (num) => {
    if (num >= 0 && num < 25) return "green";
    else if (num >= 25 && num < 50) return "rgb(199, 199, 16)";
    else if (num >= 50 && num < 75) return "orange";
    else if (num >= 75 && num <= 100) return "red";
    else return "purple";
  };
  const getLevelMessage = (num, type) => {
    if (num >= 0 && num < 25) {
      return { message: "None", level: "Great!" };
    } else if (num >= 25 && num < 50) {
      const out = { level: "Good!" };
      switch (type) {
        case "handWriting":
          out["message"] = "On a few pages...";
          return out;
        case "stains":
          out["message"] = "One or two little ones";
          return out;
        case "pagesMissing":
          out["message"] = "One or two...";
          return out;
        default:
          out["message"] = "";
          return out;
      }
    } else if (num >= 50 && num < 75) {
      const out = { level: "Not Great." };
      switch (type) {
        case "handWriting":
          out["message"] = "Handwriting on quite a few pages";
          return out;
        case "stains":
          out["message"] = "Quite a few stains exist";
          return out;
        case "pagesMissing":
          out["message"] = "Quite a few are missing";
          return out;
        default:
          out["message"] = "";
          return out;
      }
    } else if (num >= 75 && num <= 100) {
      const out = { level: "Bad." };
      switch (type) {
        case "handWriting":
          out["message"] = "Almost every page";
          return out;
        case "stains":
          out["message"] = "Stains everwhere";
          return out;
        case "pagesMissing":
          out["message"] = "Many pages are missing";
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

      // document.getElementsByClassName("ReactModalPortal")[0].childNodes;
      // document.getElementById("yes").addEventListener("scroll", () => console.log("ye"))
    }
  }, [funcs.modalIsOpen]);

  const [scrolled, setScrolled] = useState(false);

  return (
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
      <div className="modal-data-container">
        <div className="title-info-container">
          <h2 className="modal-title">{item ? item.title : "null"}</h2>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <span className="modal-section-title">
              <strong>Used at: </strong>
            </span>
            {item ? item.campus.toUpperCase() : ""}
          </li>
          <li class="list-group-item">
            <span className="modal-section-title">
              <strong>Course: </strong>
            </span>
            {item ? item.course.toUpperCase() : ""}
          </li>
          <li class="list-group-item">
            <span className="modal-section-title">
              <strong>Pickup Location: </strong>
            </span>
            {item ? item.sellingLocation : ""}
          </li>
        </ul>
        <div className="modal-content-div" onScroll={() => setScrolled(true)}>
          <div className="textbook-quality-div">
            {qualityOfTextbooks ? (
              <>
                <span className="modal-section-title">
                  <strong>Textbook Quality</strong>
                </span>
                <div>
                  Amount of Handwriting:
                  <br />
                  <strong>
                    <span
                      style={{
                        color: qualityOfTextbooks
                          ? qualityOfTextbooks.handWriting.color
                          : "purple",
                      }}
                    >
                      {qualityOfTextbooks.handWriting.data.level}
                    </span>
                    ({qualityOfTextbooks.handWriting.data.message})
                  </strong>
                </div>
                <div>
                  Amount of Stains:
                  <br />
                  <strong>
                    <span
                      style={{
                        color: qualityOfTextbooks
                          ? qualityOfTextbooks.stains.color
                          : "purple",
                      }}
                    >
                      {qualityOfTextbooks.stains.data.level}
                    </span>
                    ({qualityOfTextbooks.stains.data.message})
                  </strong>
                </div>
                <div>
                  Amount of Pages Missing:
                  <br />
                  <strong>
                    <span
                      style={{
                        color: qualityOfTextbooks
                          ? qualityOfTextbooks.pagesMissing.color
                          : "purple",
                      }}
                    >
                      {qualityOfTextbooks.pagesMissing.data.level}
                    </span>
                    ({qualityOfTextbooks.pagesMissing.data.message})
                  </strong>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <hr />
          <div className="description-container">
            <span className="modal-section-title">
              <strong>Contact Information</strong>
            </span>
            <p>{item ? item.description : "null"}</p>
          </div>
          <hr />
          <div className="description-container">
            <span className="modal-section-title">
              <strong>Additional Notes</strong>
            </span>
            <p>{item ? item.description : "null"}</p>
          </div>
        </div>
      </div>
      <img
        style={scrolled ? { display: "none" } : { display: "block" }}
        id="scroll-down-gif"
        draggable={false}
        src="https://firebasestorage.googleapis.com/v0/b/textbook-store-2e072.appspot.com/o/App_images_and_gifs%2FscrollGIf.gif?alt=media&token=934531ef-cf7f-4981-a207-eea276365a0f"
        alt="scroll down"
      />
    </Modal>
  );
}
