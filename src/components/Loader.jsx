import React from 'react';
import './Loader.css';  // Asegúrate de tener estilos para el loader

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Cargando...</p>
    </div>
  );
};

export default Loader;
