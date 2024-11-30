import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemCount from './ItemCount.jsx';
import { getProductos } from '../mocks/api.jsx';

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const productos = await getProductos();
        setItems(
          productos.filter((item) => !categoryId || item.category === categoryId)
        );
      } catch (err) {
        setError(err);
      }
    };

    fetchItems();
  }, [categoryId]);

  const onAdd = (quantity) => {
    alert(`Has añadido ${quantity} productos al carrito.`);
  };

  return (
    <div className="item-list-container">
      <h1 className="greeting">{greeting}</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="product-grid">
        {items.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src={item.img}
              alt={item.name}
              className="product-image"
            />
            <h2 className="product-name">{item.name}</h2>
            <p className="product-description">{item.description}</p>
            <p className="product-price">Precio: ${item.price}</p>
            <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
            <Link to={`/item/${item.id}`} className="details-link">
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
