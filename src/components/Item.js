import React from 'react';
import { Link } from 'react-router-dom';
import FavoritesBtn from '../containers/FavoritesBtn';

const Item = ({ data }) => {
  const { id, title, price, pictures, seller, isFavorite } = data;
  return(
    <li className="item">
      <Link to={`/products/${id}`}>
        <h2>{title}</h2>
        <img src={'https:' + pictures[0]} alt={title}/>
      </Link>
      <span>{price}</span>
      <Link to={`/sellers/${seller.id}`}>
        <span>{seller.name}</span>
        <span>{seller.rating}</span>
      </Link>
      <FavoritesBtn isFavorite={isFavorite} data={data}/>
    </li>
  );
}

export default Item;