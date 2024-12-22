import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar un producto al carrito o sumar cantidad si ya existe
  const addItem = (item, quantity) => {
    const existingItem = cartItems.find(prod => prod.id === item.id);

    if (existingItem) {
      const updatedCart = cartItems.map(prod =>
        prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity }]);
    }
  };

  // Eliminar un producto específico
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Vaciar el carrito completamente
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular la cantidad total de productos
  const totalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Calcular el precio total de la compra
  const totalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
