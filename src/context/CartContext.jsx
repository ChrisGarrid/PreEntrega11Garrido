import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Crear el hook para usar el contexto
export const useCart = () => useContext(CartContext);

// Crear el proveedor del contexto
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar un item al carrito
  const addItem = (item, quantity) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity }]);
  };

  return (
    <CartContext.Provider value={{ addItem, cart }}>
      {children}
    </CartContext.Provider>
  );
};
