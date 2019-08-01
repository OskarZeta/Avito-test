import React from 'react';
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';
import SortBar from './SortBar.js';

const Header = () => {
  return(
    <header>
      <div className="container">
        <h1>Главная</h1>
        <Link to="/favorites">
          Избранное
        </Link>
        <FilterBar />
        <SortBar />
      </div>
    </header>
  );
}
export default Header;