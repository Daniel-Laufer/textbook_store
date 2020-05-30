import React from 'react';
import "./ItemCard.css";

function ItemCard({item, handleCartAction}) {
  return (
    <div className="card">
      <div id="imageContainer">
        <img id='textbookImage' className="card-img-top" src={item.image} alt={item.title}/>
      </div>
      <div className="card-body">
      <h5 className="card-title">{item.title}</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      {/* <ul className="list-group list-group-flush">
        <li className="list-group-item">Cras justo odio</li>
        <li className="list-group-item">Dapibus ac facilisis in</li>
        <li className="list-group-item">Vestibulum at eros</li>
      </ul> */}
      <div id="cartButtonHolder" className="card-body">
        <button type="button" onClick={() => handleCartAction(item.id, "add")} className="btn btn-primary"><i className="fas fa-shopping-cart"></i></button>
        <button type="button" className="btn btn-danger"><i className="fas fa-times"></i></button>
        <button type="button" className="btn btn-info"><i className="fas fa-info"></i></button>
      </div>
    </div>
  );
}

export default ItemCard;