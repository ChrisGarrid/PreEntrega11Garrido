import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalAmount, setCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  // Cargar carrito desde localStorage al inicio para sincronizar
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (storedCart.length > 0) {
      console.log("Carrito cargado desde localStorage en Cart.jsx:", storedCart);
      setCart(storedCart);
    } else {
      console.log("LocalStorage vacío, no se sobreescribirá el carrito.");
    }
  }, [setCart]);

  // Sincronizar con Firebase al cambiar el carrito
  useEffect(() => {
    if (cart.length > 0) {
      syncCartWithFirebase();
      console.log("Sincronizando con Firebase:", cart);
    }
  }, [cart]);

  const syncCartWithFirebase = async () => {
    if (cart.length === 0) return;
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, { cart }, { merge: true });
    }
  };

  const handleRemove = (itemId) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este producto?");
    if (confirm) {
      removeFromCart(itemId);
    }
  };

  const applyDiscount = () => {
    if (coupon === 'DESCUENTO10') {
      setDiscount(totalAmount() * 0.1);
    } else {
      alert("Cupón inválido");
      setDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="btn btn-secondary">
          Volver al Menú
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Tu Carrito</h1>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>Precio: ${item.price}</p>
          <p>Subtotal: ${item.quantity * item.price}</p>
          <button onClick={() => handleRemove(item.id)} className="btn btn-danger">Eliminar</button>
        </div>
      ))}
      <hr />
      <h2>Total: ${totalAmount() - discount}</h2>
      <input 
        type="text" 
        placeholder="Ingresa un cupón" 
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button onClick={applyDiscount}>Aplicar Cupón</button>
      <button onClick={clearCart} className="btn btn-warning">Vaciar Carrito</button>
      <div className="cart-actions">
        <Link to="/" className="btn btn-primary">
          Añadir más platos
        </Link>
        <Link to="/checkout" className="btn btn-success">
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
};

export default Cart;
