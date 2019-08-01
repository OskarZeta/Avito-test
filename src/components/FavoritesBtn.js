import React from 'react';
import { ReactComponent as Icon } from '../css/fav.svg';

const FavoritesBtn = ({isFavorite, data, context: { addFavorite, removeFavorite }}) => 
  <button 
    type="button" className="item__fav-btn"
    onClick={isFavorite ? () => removeFavorite(data) : () => addFavorite(data)}
  >
    <Icon 
      fill={isFavorite ? "red" : "white"} fillRule="evenodd" 
      stroke={isFavorite ? "darkred" : "grey"} className="item__fav-icon"
    />
  </button>

export default FavoritesBtn;