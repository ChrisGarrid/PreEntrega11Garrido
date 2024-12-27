E-Commerce de Comida Japonesa 🍣
Este proyecto es una tienda online de comida japonesa que permite a los usuarios navegar, agregar productos al carrito y completar compras. La app está desarrollada con React JS y se integra con Firebase para gestionar la base de datos y el checkout.

🚀 Funcionalidades Principales
Navegación por Categorías: Filtrado dinámico de productos por categoría.
Detalle de Productos: Visualización de información detallada y opciones de compra.
Carrito de Compras: Añadir, eliminar y modificar productos en el carrito.
Checkout: Generación de órdenes con validación de datos y actualización de stock.
Sincronización con Firebase: Gestión del stock y almacenamiento de órdenes en tiempo real.
🛠️ Librerías Utilizadas
React Router DOM – Navegación y rutas dinámicas.
Firebase – Base de datos y autenticación.
Bootstrap – Estilización rápida y responsiva.
React Icons – Iconografía moderna para mejorar la interfaz.
React Hook Form (opcional) – Gestión de formularios en el checkout (pendiente de integración).
📦 Instalación y Ejecución
1. Clonar el Repositorio
bash
Copiar código
git clone https://github.com/ChrisGarrid/PreEntrega11Garrido.git
2. Instalar Dependencias
bash
Copiar código
npm install
3. Configuración de Firebase
Crear un archivo .env en la raíz del proyecto con las credenciales de Firebase:

bash
Copiar código
REACT_APP_API_KEY=AIzaSyAHPxsUR5...
REACT_APP_AUTH_DOMAIN=japonesa-7a60a.firebaseapp.com
REACT_APP_PROJECT_ID=japonesa-7a60a
REACT_APP_STORAGE_BUCKET=japonesa-7a60a.firebasestorage.app
REACT_APP_MESSAGING_SENDER_ID=333802961852
REACT_APP_APP_ID=1:333802961852:web:f1f74c87d382b0330189b9
4. Ejecutar el Proyecto
bash
Copiar código
npm start
🛒 Flujo de Usuario
Navegación por Productos

Desde la página principal, los usuarios pueden ver productos disponibles por categorías (Ramen, Entradas, Fondos, etc.).
Agregar al Carrito

Desde la lista de productos (ItemList) o el detalle (ItemDetail), el usuario puede añadir productos al carrito.
Stock: El stock se descuenta solo al completar el checkout.
Carrito de Compras

Se puede acceder al carrito en cualquier momento desde la barra de navegación (Navbar).
Desde aquí, se pueden eliminar productos o vaciar el carrito completamente.
Checkout y Finalización de Compra

Al hacer clic en "Finalizar Compra", se dirige al formulario de checkout donde se completan los datos del comprador.
Tras confirmar la compra, se genera un número de orden y se actualiza el stock en Firebase.
📂 Estructura del Proyecto
bash
Copiar código
/src
│
├── components
│   ├── ItemListContainer.jsx
│   ├── ItemDetailContainer.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│
├── context
│   └── CartContext.jsx
│
├── firebase
│   └── firebaseConfig.js
│
└── App.js
🔧 Próximas Funcionalidades (Opcional)
Reserva Temporal de Stock: Bloqueo de productos mientras el usuario navega (evitar sobreventa).
Autenticación de Usuarios: Integración con Firebase Auth.
Historial de Compras: Visualización de órdenes pasadas del usuario.
📬 Contacto
Desarrollado por Christian G.

GitHub: ChrisGarrid
Correo Electrónico: chrisgarrido@example.com