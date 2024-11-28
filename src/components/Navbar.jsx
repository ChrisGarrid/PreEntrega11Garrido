// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import Categories from './Categories';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Mi Tienda</Link>
      <Categories />
      <CartWidget />
    </nav>
  );
};

export default Navbar;
