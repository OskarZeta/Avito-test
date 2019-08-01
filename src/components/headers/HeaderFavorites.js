import React from 'react';
import { Link } from 'react-router-dom';

const HeaderFavorites = () => 
  <header className="header">
    <div className="container">
      <h1>Избранное</h1>
      <Link to="/">
        На главную
      </Link>
    </div>
  </header>
  
export default HeaderFavorites;