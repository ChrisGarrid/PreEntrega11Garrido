import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

function CartWidget() {
  const { totalItems } = useCart();  // Obtener el total de ítems del carrito

  return (
    <div className="cart-widget" style={{ position: 'relative', display: 'inline-block' }}>
      <FaShoppingCart size={24} />
      {totalItems() > 0 && (  // Solo mostrar si hay productos
        <span className="badge" style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '4px 8px',
          fontSize: '12px'
        }}>
          {totalItems()} {/* Número dinámico */}
        </span>
      )}
    </div>
  );
}

export default CartWidget;
