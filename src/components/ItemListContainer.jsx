import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchItems();
  }, [categoryId]);

  const fetchItems = async () => {
    try {
      const collectionRef = collection(db, 'items');
      let q;

      if (categoryId) {
        q = query(collectionRef, where('category', '==', categoryId));
      } else {
        q = collectionRef;
      }

      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(products);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-list-container">
      <h1>Productos Disponibles {categoryId ? `- ${categoryId}` : ''}</h1>
      {loading ? <p>Cargando productos...</p> : <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;
