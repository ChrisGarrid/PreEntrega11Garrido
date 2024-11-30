import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductos } from '../mocks/api.jsx';
import { CartContext } from '../context/CartContext'; // Asegúrate de que esta ruta esté bien
import ItemCount from './ItemCount';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const { addItem } = useContext(CartContext); // Asegúrate de que addItem se obtiene del contexto

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const productos = await getProductos();
        console.log("Productos obtenidos:", productos);
        const foundItem = productos.find((prod) => prod.id === itemId);
        console.log("Producto encontrado:", foundItem);
        setItem(foundItem);
      } catch (err) {
        setError('Error al cargar los detalles del producto.');
      }
    };
  
    fetchItemDetail();
  }, [itemId]);
  

  if (error) return <p>{error}</p>;
  if (!item) return <p>Cargando detalles...</p>;

  const onAdd = (quantity) => {
    addItem(item, quantity); // Esto ahora debería funcionar
    alert(`Agregaste ${quantity} unidades de ${item.name} al carrito.`);
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
