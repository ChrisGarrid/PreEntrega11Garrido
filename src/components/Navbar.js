import React from 'react';
import CartWidget from './CartWidget';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Mi Tienda</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/category1">Setas Comestibles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/category2">Setas premium</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/category3">Set de Setas</a>
            </li>
          </ul>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
