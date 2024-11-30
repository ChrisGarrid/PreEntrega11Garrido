import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import { CartContextProvider } from './context/CartContext';  // Importar el CartContextProvider

const App = () => {
  return (
    <CartContextProvider>  {/* Envolver la app con el contexto */}
      <Router>
        <Navbar />
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<ItemListContainer greeting="Bienvenido a Mi Tienda de comida japonesa" />} />

          {/* Ruta por categoría */}
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por Categoría" />} />

          {/* Ruta para detalles del producto */}
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        </Routes>
      </Router>
    </CartContextProvider>
  );
};

export default App;
