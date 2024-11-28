import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemCount from './ItemCount.jsx';


const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    // Simular llamada a API
    const fetchItems = async () => {
      const itemsMock = [
        { id: 1, name: 'Producto 1', stock: 10, category: 'category1', image: 'img/ANAGO.png' },
        { id: 2, name: 'Producto 2', stock: 10, category: 'category2', image: '/img/producto1.jpg' },
      ];
      setItems(itemsMock.filter((item) => !categoryId || item.category === categoryId));
    };

    fetchItems();
  }, [categoryId]);

  const onAdd = (quantity) => {
    alert(`Has añadido ${quantity} productos al carrito.`);
  };

  return (
    <div>
      <h1>{greeting}</h1>
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
          <Link to={`/item/${item.id}`}>Ver detalles</Link>
        </div>
      ))}
    </div>
  );
};

export default ItemListContainer;
