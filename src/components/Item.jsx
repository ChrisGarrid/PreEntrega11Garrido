// Componente: Item (muestra productos individuales en la lista)
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const Item = ({ item }) => {
  const { addToCart } = useCart();

  if (!item) {
    return <p>Producto no disponible</p>;
  }

  const handleAddToCart = async (quantity) => {
    if (item.stock >= quantity) {
      const productToAdd = {
        id: item.id,
        name: item.name || 'Producto sin nombre',
        price: item.price || 0,
        quantity,
        stock: item.stock - quantity,
      };

      console.log("Producto agregado desde lista:", productToAdd);
      addToCart(productToAdd);

      // Actualizar stock en Firebase
      const itemRef = doc(db, 'items', item.id);
      try {
        await setDoc(itemRef, { stock: item.stock - quantity }, { merge: true });
        console.log("Stock actualizado desde lista en Firebase");
      } catch (error) {
        console.error("Error al actualizar stock desde lista:", error);
      }
    } else {
      alert("Producto agotado o no disponible");
    }
  };

  return (
    <div className="item-card">
      {item.discount && (
        <div className="discount-tag">
          {item.discount}% de descuento
        </div>
      )}
      <img src={item.img} alt={item.name || 'Producto sin nombre'} className="item-image" />
      <h3>{item.name || 'Producto sin nombre'}</h3>
      <p>{item.description || 'Sin descripción disponible'}</p>
      <p>Precio: ${item.price || 0}</p>
      <p>Stock: {item.stock > 0 ? item.stock : 'Sin stock'}</p>
      <ItemCount 
        stock={item.stock} 
        initial={1} 
        onAdd={handleAddToCart} 
        disabled={item.stock === 0}
      />
      {item.stock === 0 && <p>Producto Agotado</p>}
      <Link 
        to={`/item/${item.id}`} 
        className={`btn btn-primary ${item.stock === 0 ? 'disabled' : ''}`}
      >
        {item.stock === 0 ? 'Sin disponibilidad' : 'Ver detalles'}
      </Link>
    </div>
  );
};

export default Item;
