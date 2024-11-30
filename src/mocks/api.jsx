const productos = [
    {
      id: '1',
      name: 'Ramen',
      category: 'menu a',
      description: 'Fideos con sopa de res.',
      price: 100,
      img: 'https://www.pequerecetas.com/wp-content/uploads/2020/01/comida-japonesa-800x600.jpg', // Ruta de la imagen
      stock: 5
    },
    {
      id: '2',
      name: 'Tonkotsu',
      category: 'menu b',
      description: 'Fideos concentrados de sopa de cerdo.',
      price: 150,
      img: 'https://www.pequerecetas.com/wp-content/uploads/2020/01/comida-japonesa-800x600.jpg',
      stock: 10
    },
    {
      id: '3',
      name: 'gyosa',
      category: 'menu c',
      description: 'empanada al vapor de cerdo.',
      price: 200,
      img: 'https://www.pequerecetas.com/wp-content/uploads/2020/01/comida-japonesa-800x600.jpg',
      stock: 3
    }
  ];
  
  // Función simulada para obtener productos
  export const getProductos = () => {
    return new Promise((resolve, reject) => {
      let error = false;
  
      setTimeout(() => {
        if (!error) {
          resolve(productos);
        } else {
          reject('Error al cargar los productos. Intenta nuevamente más tarde.');
        }
      }, 2000); // Simulación de retraso de 2 segundos
    });
  };
  