import React from 'react';
import Item from './Item';
import { itemsPerPage } from '../globals';

function renderItems(items, sellers, limit) {
  return items.map((item, i) => {
    if (i < limit) {
      const seller = sellers.find(seller => seller.id === item.relationships.seller);
      return <Item key={item.id} data={{...item, seller}}/>
    }
  });
}

const ItemsList = ({ items, sellers }) => {
  return(
    <ul className="content__items-list">
      {renderItems(items, sellers, itemsPerPage)}
    </ul>
  );
}
export default ItemsList;