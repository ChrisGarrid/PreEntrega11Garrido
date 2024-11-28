// src/components/Categories.js
import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <ul className="navbar-categories">
      <li><Link to="/category/electronica">Electrónica</Link></li>
      <li><Link to="/category/ropa">Ropa</Link></li>
      <li><Link to="/category/hogar">Hogar</Link></li>
    </ul>
  );
};

export default Categories;
