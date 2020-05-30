import React from 'react';
import ItemCard from "../ItemShowcase/ItemCard";
import "./CartShowcase.css";



function CartShowcase({message, items, handleCartAction}) {
  return (
    <div className="CartShowcase">
        {
            items.length === 0 ? <h1>No items in your cart!</h1> : 
            items.map((item) => {
                return <ItemCard handleCartAction={handleCartAction} item={item}/>;
            })
        }
    </div>
  );
}

export default CartShowcase;
