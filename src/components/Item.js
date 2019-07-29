import React from 'react';
import { Link } from 'react-router-dom';
//import { AppContextConsumer } from '../context/AppContext';

const Item = ({ data }) => {
  const { id, category, title, price, pictures, seller } = data;
  return(
    <li className="item">
      <Link to={`/products/${id}`}>
        <h2>{title}</h2>
        <img src={'https:' + pictures[0]}/>
      </Link>
      <span>{price}</span>
      <Link to={`/sellers/${seller.id}`}>
        <span>{seller.name}</span>
        <span>{seller.rating}</span>
      </Link>
    </li>
  );
}
export default Item;

{/* <AppContextConsumer>
  {value => {
    const seller = value.find(seller => seller.id === relationships.seller);
    return (
      <li className="item">
        <Link to={`/products/${id}`}>
          <h2>{title}</h2>
          <img src={'https:' + pictures[0]}/>
        </Link>
        <span>{price}</span>
        <Link to={`/sellers/${seller.id}`}>
          <span>{seller.name}</span>
          <span>{seller.rating}</span>
        </Link>
      </li>
    );
  }}
</AppContextConsumer> */}