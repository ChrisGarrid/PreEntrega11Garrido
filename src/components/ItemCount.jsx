import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
      setError(null);
    } else {
      setError('No hay más stock disponible');
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setError(null);
    }
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
          <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} disabled={quantity >= stock}>+</button>
          <button onClick={handleAddToCart} className="btn btn-success">Agregar al carrito</button>
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ItemCount;
