import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ItemList from './ItemList';
import menuData from '../firebase/menuData.json';

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(products);
      setLoading(false);
    };

    fetchItems();
  }, []);

  const addData = () => { 
    const collectionToAdd = collection(db, 'items');
    menuData.forEach((item) => addDoc(collectionToAdd, item));
  };

  return (
    <div className="item-list-container">
      <h1>Productos Disponibles</h1>
      <button onClick={addData} className="btn btn-primary">Agregar a Firebase</button>
      {loading ? <p>Cargando productos...</p> : <ItemList items={items} />}
    </div>
  );
};

export default ItemListContainer;
