import React, { useEffect } from 'react';

import ItemsList from '../ItemsList';
import HeaderFavorites from '../headers/HeaderFavorites';
import Content from '../Content';

import { initialItems } from '../../globals';

import { AppContextProvider } from '../../context/AppContext';

const LayoutFavorites = ({ favoritesContext, items, itemsToShow, sellers, setProductsToShow }) => {
  const {addFavorite, removeFavorite} = favoritesContext;
  useEffect(() => () => setProductsToShow(initialItems), [setProductsToShow]);
  return (
    <>
      <HeaderFavorites/>
      <AppContextProvider value={{addFavorite, removeFavorite}}>
        <Content>
          <ItemsList 
            items={items} 
            itemsToShow={itemsToShow}
            sellers={sellers} 
          />
        </Content>
      </AppContextProvider>
    </>
  );
}

export default LayoutFavorites;