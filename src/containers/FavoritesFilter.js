import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class FavoritesFilter extends Component {
  state = {
    isFavorite: false
  }
  changeHandler = e => {
    this.setState({
      isFavorite: Boolean(Number(e.target.value))
    }, () => this.context.setFilter({
      name: 'isFavorite',
      value: this.state.isFavorite
    }));
  }
  render() {
    const isFavorite = this.state.isFavorite;
    return(
      <div>
        <label>
          <input 
            type="radio" name="favorites" value={0} 
            checked={!isFavorite} onChange={this.changeHandler}
          />
          <span>all</span>
        </label>
        <label>         
          <input 
            type="radio" name="favorites" value={1} 
            checked={isFavorite} onChange={this.changeHandler}
          />
          <span>favorites</span>
        </label>
      </div>
    );
  }
}

FavoritesFilter.contextType = AppContext;

export default FavoritesFilter;