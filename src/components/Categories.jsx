import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUtensils, FaWineGlassAlt, FaIceCream } from 'react-icons/fa';

const Categories = () => {
  const location = useLocation();

  // Definir un array de categorías con iconos
  const categories = [
    { id: 'Ramen', name: 'Ramen', icon: <FaUtensils /> },
    { id: 'Fondos', name: 'Fondos', icon: <FaUtensils /> },
    { id: 'Entradas', name: 'Entradas', icon: <FaUtensils /> },
    { id: 'Postres', name: 'Postres', icon: <FaIceCream /> },
    { id: 'Bebidas', name: 'Bebidas', icon: <FaWineGlassAlt /> }
  ];

  return (
    <ul className="navbar-categories">
      {categories.map(category => (
        <li 
          key={category.id} 
          className={location.pathname === `/category/${category.id}` ? 'active' : ''}
        >
          <Link to={`/category/${category.id}`}>
            {category.icon} {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
