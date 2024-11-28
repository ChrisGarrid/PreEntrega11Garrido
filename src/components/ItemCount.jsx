import React, { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAdd(quantity);
    } else {
      alert('Debes seleccionar al menos 1 unidad para agregar al carrito.');
    }
  };

  return (
    <div className="item-count">
      <button onClick={handleDecrease} disabled={quantity === 0}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrease} disabled={quantity >= stock}>
        +
      </button>
      <button onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
