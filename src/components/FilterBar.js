import React from 'react';

import CategoryFilter from '../containers/CategoryFilter';
import PriceFilter from '../containers/PriceFilter';
import FavoritesFilter from '../containers/FavoritesFilter';

const FilterBar = (props) => 
  <form>
    <div>Filter</div>
    <label>
      <span>by category</span>
      <CategoryFilter/>
    </label>
    <label>
      <span>by price</span>
      <PriceFilter/>
    </label>
    <label>
      <span>by favorites</span>
      <FavoritesFilter/>
    </label>
  </form>

export default FilterBar;