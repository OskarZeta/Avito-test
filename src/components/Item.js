import React from 'react';
import FavoritesBtn from './FavoritesBtn';
import { AppContextConsumer } from '../context/AppContext';

function parsePrice(price) {
  return [...price.toString()].reverse().map((letter, i) => 
    (i + 1) % 3 || i === 0 ? letter : ' ' + letter 
  ).reverse().join(''); 
}

const Item = ({ data }) => {
  const { title, price, pictures, seller, isFavorite } = data;
  return(
    <li className="item">
      <div>
        <img className="border item__img" src={'https:' + pictures[0]} alt={title}/>
        <h5 className="item__header">{title}</h5>
      </div>
      {price ? 
        <div className="item__price my-2">{parsePrice(price)} ₽</div> :
        <div className="item__price-empty my-2">Цена не указана</div>
      }
      <div className="mb-2">
        <div>Продавец: </div>
        <div>{seller.name}</div>
      </div>
      <div>
        <span>Рейтинг: </span>
        <span>{seller.rating}</span>
      </div>   
      <AppContextConsumer>
        {value => <FavoritesBtn isFavorite={isFavorite} data={data} context={value}/>}
      </AppContextConsumer>
    </li>
  );
}

export default Item;