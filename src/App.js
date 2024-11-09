import React from 'react';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div>
      <Navbar />
      <ItemListContainer greeting="Bienvenido a mi Tienda De Setas" />
    </div>
  );
}

export default App;
