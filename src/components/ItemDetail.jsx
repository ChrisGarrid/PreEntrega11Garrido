import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const ItemDetail = ({ item }) => {
  const { addToCart } = useCart();
  const [quantityAdded, setQuantityAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (quantity) => {
    if (item && item.id && quantity > 0) {
      const productToAdd = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
        stock: item.stock - quantity
      };

      console.log("Producto agregado al carrito:", productToAdd);
      addToCart(productToAdd);

      // Actualizar stock en Firebase
      const itemRef = doc(db, 'items', item.id);
      try {
        await setDoc(itemRef, { stock: item.stock - quantity }, { merge: true });
        console.log("Stock actualizado en Firebase");
      } catch (error) {
        console.error("Error al actualizar stock:", error);
      }

      setQuantityAdded(true);
    }
  };

  return (
    <div className="item-detail">
      <h2>{item?.name || 'Producto no encontrado'}</h2>
      <p>{item?.description || 'Sin descripción disponible'}</p>
      <p>{item ? '¡Un delicioso platillo para disfrutar!' : ''}</p>
      <p>Precio: ${item?.price || 'N/A'}</p>
      {item?.stock > 0 ? (
        quantityAdded ? (
          <button className="btn btn-primary" onClick={() => navigate('/cart')}>
            Ir al carrito
          </button>
        ) : (
          <ItemCount stock={item.stock} initial={1} onAdd={handleAddToCart} />
        )
      ) : (
        <p>Producto agotado</p>
      )}
    </div>
  );
};

export default ItemDetail;
