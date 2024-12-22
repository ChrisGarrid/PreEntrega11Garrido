import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="container mt-5">
          <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenido a la tienda" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por Categoría" />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;