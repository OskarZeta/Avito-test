import React from 'react';
import { Link } from 'react-router-dom';

const HeaderFavorites = () => {
  return(
    <header>
      <h1>Избранное</h1>
      <Link to="/">
        На главную
      </Link>
    </header>
  );
}
export default HeaderFavorites;