import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductoById } from '../firebase/firebaseConfig';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const foundItem = await getProductoById(itemId);
        setItem(foundItem);
      } catch (err) {
        setError('Producto no encontrado.');
      }
    };

    fetchItemDetail();
  }, [itemId]);

  if (error) return <p>{error}</p>;
  if (!item) return <p>Cargando detalles...</p>;

  const onAdd = (quantity) => {
    addItem(item, quantity);
  };

  return (
    <div className="item-detail">
      <img src={item.img} alt={item.name} />
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Precio: ${item.price}</p>
      <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
    </div>
  );
};

export default ItemDetailContainer;
