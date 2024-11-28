// src/components/ItemDetailContainer.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
  const { id } = useParams();

  useEffect(() => {
    // Simular llamada para obtener detalles del producto según `id`
    console.log(`Cargando detalles para el producto con id: ${id}`);
  }, [id]);

  return (
    <div>
      <h2>Detalle del Producto: {id}</h2>
      {/* Aquí irá la información detallada del producto */}
    </div>
  );
};

export default ItemDetailContainer;
