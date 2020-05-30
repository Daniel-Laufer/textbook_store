import React from 'react';
import ItemCard from "./ItemCard"

import "./ItemShowcase.css";

function ItemShowcase({items, handleCartAction}) {
  return (
    <div className="ItemShowcase">
        {
            items.map((item) => {
                return <ItemCard handleCartAction={handleCartAction} item={item}/>;
            })
        }
    </div>
  );
}

export default ItemShowcase;
