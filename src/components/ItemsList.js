import React from 'react';
import Item from './Item';

function renderItems(data, limit) {
  const { items, sellers, favorites } = data;
  return items.map((item, i) => {
    if (i < limit) {
      const seller = sellers.find(seller => seller.id === item.relationships.seller);
      const isFavorite = favorites ? favorites.find(fav => fav.id === item.id) : true;
      return <Item key={item.id} data={{...item, seller, isFavorite}}/>
    }
    return false;
  });
}

const ItemsList = ({ items, sellers, favorites, itemsToShow }) => {
  return(
    <ul className="content__items-list">
      {renderItems({ items, sellers, favorites }, itemsToShow)}
    </ul>
  );
}
export default ItemsList;