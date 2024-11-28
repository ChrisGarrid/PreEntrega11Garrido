// src/components/Item.js
import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ id, name }) => {
  return (
    <div>
      <h3>{name}</h3>
      <Link to={`/item/${id}`}>Ver Detalle</Link>
    </div>
  );
};

export default Item;
