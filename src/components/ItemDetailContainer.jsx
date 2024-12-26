import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (!id) {
          throw new Error('ID del producto no encontrado');
        }
        console.log('ID recibido:', id);  // Depuración del ID
        const docRef = doc(db, 'items', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Producto encontrado:', docSnap.data());
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('Producto no existe en Firebase.');
          setError('Producto no encontrado');
        }
      } catch (error) {
        setError('Error al cargar el producto');
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return item ? <ItemDetail item={item} /> : <p>Producto no encontrado</p>;
};

export default ItemDetailContainer;
