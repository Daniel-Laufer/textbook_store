import React from "react";
import Modal from "react-modal";
import "./TextbookModal.css";

Modal.setAppElement("#root");

export default function TextbookModal({ funcs, item }) {
  console.log(funcs.modalIsOpen);
  return (
    <Modal
      className="textbook-modal"
      isOpen={funcs.modalIsOpen}
      onAfterOpen={funcs.afterOpenModal}
      onRequestClose={funcs.closeModal}
      // style={customStyles}
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
        <img className="modal-image" src={item ? item.image : "null"} />
      </div>
      <div className="modal-content-div">
        <h2>{item ? item.title : "null"}</h2>
        <p>{item ? item.description : "null"}</p>
      </div>
    </Modal>
  );
}
