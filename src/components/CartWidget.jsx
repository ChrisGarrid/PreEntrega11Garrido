import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { totalItems } = useCart();

  return (
    <div className="cart-widget">
      <Link to="/cart" className="cart-link">
        <FaShoppingCart size={24} />
        {totalItems() > 0 && <span className="cart-badge">{totalItems()}</span>}
      </Link>
    </div>
  );
};

export default CartWidget;
