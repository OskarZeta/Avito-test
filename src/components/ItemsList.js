import React from 'react';
import Item from './Item';
import { itemsPerPage } from '../globals';

function renderItems(data, limit) {
  const { items, sellers, favorites } = data;
  return items.map((item, i) => {
    if (i < limit) {
      const seller = sellers.find(seller => seller.id === item.relationships.seller);
      const isFavorite = favorites.find(fav => fav.id === item.id);
      return <Item key={item.id} data={{...item, seller, isFavorite}}/>
    }
    return false;
  });
}

const ItemsList = ({ items, sellers, favorites }) => {
  return(
    <ul className="content__items-list">
      {renderItems({ items, sellers, favorites }, itemsPerPage)}
    </ul>
  );
}
export default ItemsList;