import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { getProductos } from '../firebase/firebaseConfig';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const productos = await getProductos();
        if (productos.length === 0) {
          setError('No hay productos disponibles.');
        } else {
          setItems(productos);
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('Hubo un problema al cargar los productos.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      setItems([...items]);
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  if (error) {
    return (
      <div>
        <h3>{error}</h3>
        <Link to='/' className='btn btn-dark'>Volver a home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{greeting}</h1>
      {loading ? <Loader /> : <ItemList items={items} onAddToCart={handleAddToCart} />}
    </div>
  );
};

export default ItemListContainer;
