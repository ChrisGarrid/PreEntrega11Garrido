import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Checkout = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: '', email: '', confirmEmail: '', phone: '' });
  const [deliveryMethod, setDeliveryMethod] = useState('retiro');
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.name || !buyer.email || !buyer.confirmEmail || !buyer.phone) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (buyer.email !== buyer.confirmEmail) {
      setError('Los correos electrónicos no coinciden.');
      return;
    }

    if (!/^[0-9]{9,15}$/.test(buyer.phone)) {
      setError('Ingrese un número de teléfono válido.');
      return;
    }

    const order = {
      buyer,
      items: cart,
      total: totalAmount(),
      deliveryMethod,
      date: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      setError('Hubo un error al procesar la orden.');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Finalizar Compra</h1>
      {orderId ? (
        <div>
          <h2>Gracias por su compra!</h2>
          <p>Su número de orden es: <strong>{orderId}</strong></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={buyer.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={buyer.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Confirmar Email</label>
            <input
              type="email"
              name="confirmEmail"
              value={buyer.confirmEmail}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Teléfono</label>
            <input
              type="text"
              name="phone"
              value={buyer.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Método de Entrega</label>
            <select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
              <option value="retiro">Retiro en Sucursal</option>
              <option value="envio">Envío a Domicilio</option>
            </select>
          </div>

          <div className="order-summary">
            <h3>Resumen del Pedido</h3>
            {cart.map(item => (
              <div key={item.id}>
                <p>{item.name} x {item.quantity} - ${item.price * item.quantity}</p>
              </div>
            ))}
            <h4>Total: ${totalAmount()}</h4>
          </div>

          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-success" disabled={orderId !== null}>
            {orderId ? 'Procesando...' : 'Confirmar Compra'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
