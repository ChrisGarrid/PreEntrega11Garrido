import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore';
import menuData from './menuData.json';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAHPxsUR5SwFlDofP4N7F6sCXyY5g-YJT0",
  authDomain: "japonesa-7a60a.firebaseapp.com",
  projectId: "japonesa-7a60a",
  storageBucket: "japonesa-7a60a.firebasestorage.app",
  messagingSenderId: "333802961852",
  appId: "1:333802961852:web:f1f74c87d382b0330189b9",
  measurementId: "G-H56PRKR03D"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener todos los productos
export const getProductos = async () => {
  const productosCol = collection(db, 'items');
  const productosSnapshot = await getDocs(productosCol);
  return productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener producto por ID
export const getProductoById = async (id) => {
  const productoRef = doc(db, 'items', id);
  const productoSnapshot = await getDoc(productoRef);
  if (productoSnapshot.exists()) {
    return { id: productoSnapshot.id, ...productoSnapshot.data() };
  } else {
    throw new Error('Producto no encontrado');
  }
};

// Crear una orden en Firebase
export const createOrder = async (order) => {
  const ordersCol = collection(db, 'orders');
  const orderRef = await addDoc(ordersCol, order);
  return orderRef.id;
};

// Cargar datos iniciales desde JSON (Evitar duplicidad)
export const uploadMenuData = async () => {
  const itemsCol = collection(db, 'items');
  const productosSnapshot = await getDocs(itemsCol);
  if (productosSnapshot.empty) {
    for (const item of menuData) {
      await addDoc(itemsCol, item);
      console.log(`Item ${item.name} agregado a Firestore`);
    }
  } else {
    console.log('Los productos ya están cargados en Firestore');
  }
};

export { db };
