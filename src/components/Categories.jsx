// src/components/Categories.js
import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <ul className="navbar-categories">
      <li><Link to="/category/menu a">menu a</Link></li>
      <li><Link to="/category/menu b">menu b</Link></li>
      <li><Link to="/category/menu c">menu c</Link></li>
    </ul>
  );
};

export default Categories;
