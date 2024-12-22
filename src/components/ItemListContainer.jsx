import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { getProductos } from '../firebase/firebaseConfig';

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const productos = await getProductos();
        setItems(productos);
      } catch (err) {
        setError('Error al cargar productos.');
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="container">
      <h1 className="greeting">{greeting}</h1>
      {error && <p>{error}</p>}
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;
