import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
