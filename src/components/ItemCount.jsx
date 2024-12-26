import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [added]);

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
    if (quantity > 0 && stock > 0) {
      onAdd(quantity);
      setAdded(true);
      setQuantity(1);  // Resetear cantidad después de agregar
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
          <button onClick={handleDecrease} disabled={quantity <= 1 || stock === 0}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} disabled={quantity >= stock || stock === 0}>+</button>
          <button 
            onClick={handleAddToCart} 
            className="btn btn-success"
            disabled={stock === 0}
          >
            Agregar al carrito
          </button>
        </>
      )}
      {error && <p className="error">{error}</p>}
      {stock === 0 && <p className="error">Producto agotado</p>}
    </div>
  );
};

export default ItemCount;
