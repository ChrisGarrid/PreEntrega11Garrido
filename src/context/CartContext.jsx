import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Guardar carrito en localStorage solo si hay elementos
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const addToCart = (item) => {
    if (!item || !item.id || !item.name || !item.price) {
      console.error('El producto no tiene suficiente información para ser agregado.');
      return;
    }

    const existingItem = cart.find((prod) => prod.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((prod) =>
        prod.id === item.id ? { ...prod, quantity: prod.quantity + item.quantity } : prod
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newCart = [...cart, item];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removeFromCart = async (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    if (updatedCart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      localStorage.removeItem('cart');
    }

    if (itemToRemove) {
      const itemRef = doc(db, 'items', id);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        const currentStock = itemSnap.data().stock;
        await setDoc(itemRef, { stock: currentStock + itemToRemove.quantity }, { merge: true });
        console.log("Stock restaurado en Firebase:", itemToRemove.quantity);
      }
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const totalAmount = () => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalAmount, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
