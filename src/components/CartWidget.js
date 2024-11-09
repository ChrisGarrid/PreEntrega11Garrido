import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function CartWidget() {
  return (
    <div className="cart-widget" style={{ position: 'relative', display: 'inline-block' }}>
      <FaShoppingCart size={24} />
      <span className="badge" style={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        background: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '4px 8px',
        fontSize: '12px'
      }}>5</span> {/* Número hardcodeado */}
    </div>
  );
}

export default CartWidget;
