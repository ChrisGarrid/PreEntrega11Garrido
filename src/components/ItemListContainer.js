// src/components/ItemListContainer.js
import React from 'react';

const ItemListContainer = ({ greeting }) => {
  return (
    <div className="container mt-5">
      <h2>{greeting}</h2>
      {/* Aquí ponemos ItemList más adelante */}
    </div>
  );
};

export default ItemListContainer;
