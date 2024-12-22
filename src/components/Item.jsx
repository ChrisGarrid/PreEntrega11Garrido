import React from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount.jsx';

function Item({ item }) {
  return (
    <div className="item-card">
      <img src={item.img} alt={item.name} className="item-image" />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Precio: ${item.price}</p>
      <p>Stock: {item.stock}</p>
      <ItemCount 
        stock={item.stock} 
        initial={1} 
        onAdd={(quantity) => alert(`Has añadido ${quantity} al carrito`)} 
      />
      <Link to={`/item/${item.id}`} className='btn btn-primary'>Ver detalles</Link>
    </div>
  );
}

export default Item;
