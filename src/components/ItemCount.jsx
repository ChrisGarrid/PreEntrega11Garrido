// src/components/ItemCount.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);
  const [added, setAdded] = useState(false);

  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAdd(quantity);
      setAdded(true);
    }
  };

  return (
    <div className="item-count">
      {added ? (
        <Link to="/cart">
          <button className="btn btn-primary">Ir al carrito</button>
        </Link>
      ) : (
        <>
          <button onClick={handleDecrease} disabled={quantity === 0}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} disabled={quantity >= stock}>+</button>
          <button onClick={handleAddToCart}>Agregar al carrito</button>
        </>
      )}
    </div>
  );
};

export default ItemCount;
