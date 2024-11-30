import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductos } from '../mocks/api.jsx'; // Importa la función
import Item from './Item';

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const productos = await getProductos(); // Llama a la promesa
        setItems(
          productos.filter((item) => !categoryId || item.category === categoryId)
        );
      } catch (err) {
        setError(err); // Maneja el error en caso de rechazo
      }
    };

    fetchItems();
  }, [categoryId]);

  const onAdd = (quantity) => {
    alert(`Has añadido ${quantity} productos al carrito.`);
  };

  return (
    <div>
      <h1>{greeting}</h1>
      {error && <p>{error}</p>} {/* Muestra el error si ocurre */}
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <Item item={item} onAdd={onAdd} /> {/* Usamos el componente Item */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
