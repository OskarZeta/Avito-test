import React, { Component } from 'react';

import AppContext from '../context/AppContext';

class FavoritesBtn extends Component {
  render() {
    const { isFavorite, data } = this.props;
    const { addFavorite, removeFavorite } = this.context;
    return(
      <button 
        type="button"
        onClick={isFavorite ? () => removeFavorite(data) : () => addFavorite(data)}
      >
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    );
  }
}

FavoritesBtn.contextType = AppContext;

export default FavoritesBtn;