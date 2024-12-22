import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: '', email: '', confirmEmail: '', phone: '', deliveryMethod: 'retirar' });
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.name || !buyer.email || !buyer.confirmEmail || !buyer.phone || !buyer.deliveryMethod) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (buyer.email !== buyer.confirmEmail) {
      setEmailError('Los correos electrónicos no coinciden.');
      return;
    }

    const order = {
      buyer,
      items: cart,
      total: totalAmount(),
      date: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      setError('Hubo un error al procesar la orden. Inténtelo nuevamente.');
    }
  };

  if (orderId) {
    return (
      <div className="order-confirmation">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
        <Link to="/" className="btn btn-primary">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Finalizar Compra</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <input 
          type="text" 
          name="name" 
          placeholder="Nombre Completo" 
          value={buyer.name}
          onChange={handleInputChange}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Correo Electrónico" 
          value={buyer.email}
          onChange={handleInputChange}
        />
        <input 
          type="email" 
          name="confirmEmail" 
          placeholder="Confirma tu Correo" 
          value={buyer.confirmEmail}
          onChange={handleInputChange}
        />
        <input 
          type="tel" 
          name="phone" 
          placeholder="Teléfono" 
          value={buyer.phone}
          onChange={handleInputChange}
        />
        <select name="deliveryMethod" value={buyer.deliveryMethod} onChange={handleInputChange}>
          <option value="retirar">Retiro en sucursal</option>
          <option value="envio">Envío a domicilio</option>
        </select>
        {emailError && <p className="error">{emailError}</p>}
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn btn-success">Confirmar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;
