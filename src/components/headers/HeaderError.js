import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBlank = () => 
  <header className="header">
    <div className="container">
      <h1>Ошибка</h1>
      <Link to="/">
        На главную
      </Link>
    </div>
  </header>

export default HeaderBlank;