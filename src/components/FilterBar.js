import React from 'react';

import CategoryFilter from '../containers/CategoryFilter';
import PriceFilter from '../containers/PriceFilter';
import FavoritesFilter from '../containers/FavoritesFilter';

const FilterBar = () => 
  <form className="form my-2">
    <h5>Фильтры</h5>
    <div>
      <div>
        <span>Категория</span>
        <CategoryFilter/>
      </div>
      <div>
        <span>Цена</span>
        <PriceFilter/>
      </div>
      <div>
        <span>Избранное</span>
        <FavoritesFilter/>
      </div>
    </div>
  </form>

export default FilterBar;