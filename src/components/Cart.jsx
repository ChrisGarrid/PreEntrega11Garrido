import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeItem, clearCart, totalPrice } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío. <Link to="/">Volver al catálogo</Link></p>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price}</p>
                </div>
                <div>
                  <p>Subtotal: ${item.quantity * item.price}</p>
                  <button onClick={() => removeItem(item.id)} className="btn btn-danger">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mt-4">Total: ${totalPrice()}</h3>
          <button onClick={clearCart} className="btn btn-danger mt-3">Vaciar carrito</button>
          <Link to="/checkout" className="btn btn-success mt-3 ms-3">Ir a Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
