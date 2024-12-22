// src/components/Categories.js
import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  // Definir un array de categorías
  const categories = [
    { id: 'Ramen', name: 'Ramen' },
    { id: 'Fondos', name: 'Fondos' },
    { id: 'Entradas', name: 'Entradas' },
    { id: 'Postres', name: 'Postres' },
    { id: 'Bebidas', name: 'Bebidas' }
  ];

  return (
    <ul className="navbar-categories">
      {/* Iterar sobre el array de categorías y renderizar cada una */}
      {categories.map(category => (
        <li key={category.id}>
          <Link to={`/category/${category.id}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
