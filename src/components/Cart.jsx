import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart, removeItem, clearCart, totalAmount } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  const handleQuantityChange = (item, action) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        if (action === 'increase' && cartItem.quantity < item.stock) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else if (action === 'decrease' && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const applyDiscount = () => {
    if (discountCode === 'DESCUENTO10') {
      setDiscountValue(0.1 * totalAmount());
      setDiscountApplied(true);
    } else {
      alert('Código inválido.');
    }
  };

  const totalWithDiscount = totalAmount() - discountValue;

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>El carrito está vacío</h2>
        <Link to="/" className="btn btn-primary">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.img} alt={item.name} className="cart-item-img" />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Precio: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(item, 'decrease')} className="btn btn-secondary">-</button>
              <button onClick={() => handleQuantityChange(item, 'increase')} className="btn btn-secondary">+</button>
            </div>
            <p>Total: ${item.price * item.quantity}</p>
            <button onClick={() => removeItem(item.id)} className="btn btn-danger">Eliminar</button>
          </div>
        </div>
      ))}

      <h3>Total a pagar: ${totalWithDiscount}</h3>
      {discountApplied && <p>Descuento aplicado: -${discountValue}</p>}
      <div className="discount-section">
        <input 
          type="text" 
          placeholder="Código de descuento" 
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button onClick={applyDiscount} className="btn btn-info">Aplicar</button>
      </div>
      <button onClick={clearCart} className="btn btn-warning">Vaciar Carrito</button>
      <Link to="/checkout" className="btn btn-success">Finalizar Compra</Link>
    </div>
  );
};

export default Cart;
