import React, { useState } from 'react';
import Item from './Item';

const ItemList = ({ items, loading }) => {
  const [visibleItems, setVisibleItems] = useState(6);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 6);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
      <div className="item-list">
        {items.slice(0, visibleItems).map((item) => (
          <div className="item-card" key={item.id}>
            <Item item={item} />
            {item.stock === 0 && <div className="out-of-stock">Agotado</div>}
          </div>
        ))}
      </div>
      {visibleItems < items.length && (
        <button onClick={loadMore} className="btn btn-secondary">Cargar más</button>
      )}
      {items.length === 0 && !loading && <p>No hay productos disponibles</p>}
    </div>
  );
};

export default ItemList;
