import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductos } from '../mocks/api.jsx';
import { useCart } from '../context/CartContext';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  React.useEffect(() => {
    getProductos().then((productos) => {
      const product = productos.find((prod) => prod.id === parseInt(id));
      setItem(product || null);
    });
  }, [id]);

  const handleAddToCart = () => {
    addItem(item, 1);
    setAdded(true);
  };

  if (!item) return <div>Cargando...</div>;

  return (
    <div className="item-detail">
      <h1>{item.name}</h1>
      <img src={item.img} alt={item.name} className="item-detail-image" />
      <p>{item.description}</p>
      <p>Precio: ${item.price}</p>
      <p>Stock disponible: {item.stock}</p>
      
      {added ? (
        <Link to="/cart">
          <button className="btn btn-primary">Ir al carrito</button>
        </Link>
      ) : (
        <button onClick={handleAddToCart} className="btn btn-success">
          Añadir al carrito
        </button>
      )}
    </div>
  );
}

export default ItemDetail;
