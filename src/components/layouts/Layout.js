import React, { useEffect } from 'react';

import ItemsList from '../ItemsList';
import Header from '../headers/Header';
import Content from '../Content';

import { initialItems } from '../../globals';

import { AppContextProvider } from '../../context/AppContext';

const Layout = ({ filterContext, favoritesContext, items, itemsToShow, sellers, favorites, setProductsToShow }) => {
  const {setFilter, setSorting, sorting, filters} = filterContext;
  const {addFavorite, removeFavorite} = favoritesContext;
  useEffect(() => () => setProductsToShow(initialItems), [setProductsToShow]);
  return (
    <>
      <AppContextProvider value={{setFilter, setSorting, sorting, filters}}>
        <Header/>
      </AppContextProvider>
      <AppContextProvider value={{addFavorite, removeFavorite}}>
        <Content>
          <ItemsList 
            items={items} 
            itemsToShow={itemsToShow}
            sellers={sellers} favorites={favorites}
          />
        </Content>
      </AppContextProvider>
    </>
  );
}
export default Layout;