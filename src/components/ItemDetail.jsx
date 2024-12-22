import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useParams, Link } from 'react-router-dom';
import { getProductoById } from '../firebase/firebaseConfig';
import ItemCount from './ItemCount';

const ItemDetail = () => {
  const { addItem } = useCart();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const product = await getProductoById(itemId);
        setItem(product);
      } catch {
        setItem(null);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleAddToCart = () => {
    addItem(item, quantity);
    setAdded(true);
  };

  if (!item) return <div>Cargando...</div>;

  return (
    <div className="item-detail">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Precio: ${item.price}</p>
      {added ? (
        <Link to="/cart">
          <button className="btn btn-primary">Ir al carrito</button>
        </Link>
      ) : (
        <div>
          <ItemCount quantity={quantity} setQuantity={setQuantity} />
          <button onClick={handleAddToCart} className="btn btn-primary">
            Agregar al carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
