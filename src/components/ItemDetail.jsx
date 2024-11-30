import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductos } from '../mocks/api.jsx'; // Función para obtener los productos

function ItemDetail() {
  const { id } = useParams(); // Obtenemos el id del producto desde la URL
  const [item, setItem] = useState(null); // Estado para el producto
  const [error, setError] = useState(null); // Estado para manejar errores

  // Cargar los detalles del producto al montar el componente
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const productos = await getProductos(); // Llamamos a la función que obtiene los productos
        const product = productos.find((producto) => producto.id === parseInt(id)); // Buscamos el producto por id
        if (product) {
          setItem(product); // Si se encuentra, lo guardamos en el estado
        } else {
          setError('Producto no encontrado'); // Si no lo encontramos, mostramos un mensaje de error
        }
      } catch (err) {
        setError('Error al cargar el producto'); // Si ocurre un error con la API
      }
    };

    fetchItem();
  }, [id]);

  // Si hay error, mostramos el mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  // Si el producto no se ha cargado aún, mostramos un cargando...
  if (!item) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="item-detail">
      <h1>{item.name}</h1>
      <img src={item.img} alt={item.name} className="item-detail-image" />
      <p>{item.description}</p>
      <p>Precio: ${item.price}</p>
      <p>Stock disponible: {item.stock}</p>
      <button className="btn btn-success">Añadir al carrito</button>
    </div>
  );
}

export default ItemDetail;
