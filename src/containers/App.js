import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { urlProducts, urlSellers } from '../globals.js'; 

import ItemsList from '../components/ItemsList';
import FilterBar from '../components/FilterBar';
import SortBar from '../components/SortBar.js';

import { AppContextProvider } from '../context/AppContext';
import { initialItems, itemsToAdd, scrollMargin } from '../globals';

class App extends Component {
  state = {
    loading: true,
    error: false,
    products: [],
    filteredProducts: null,
    sellers: [],
    favorites: JSON.parse(localStorage.getItem('avito-favorites')) || [],
    filters: {
      category: 'all',
      price: { from: 'all', to: 'all' },
      isFavorite: false
    },
    sorting: 'popularity',
    productsToShow: initialItems
  }
  fetchData(url) {
    return axios.get(url)
      .then(res => {
        if (res.status !== 200) throw new Error('Network error');
        return res.data;
      })
  }
  setFilter = filter => {
    this.setState({
      filters: { ...this.state.filters, ...{
        [filter.name] : filter.value
      }}
    });
  }
  setSorting = sorting => {
    this.setState({ sorting });
  }
  addFavorite = item => {
    let favorites = this.state.favorites.slice(0);
    favorites.push(item);
    this.setState({ favorites });
  }
  removeFavorite = item => {
    let favorites = this.state.favorites.slice(0);
    let index = favorites.findIndex(fav => fav.id === item.id);
    favorites.splice(index, 1);
    this.setState({ favorites });
  }
  filterProducts() {
    const { filters, products, favorites } = this.state;
    const { category, price: { from, to }, isFavorite } = filters;
    let filteredProducts = products.slice(0);
    filteredProducts = filteredProducts.filter(item => { 
      if ((category === 'all' || item.category === category) &&
          (from === 'all' || item.price >= from) &&
          (to === 'all' || item.price < to) && 
          (!isFavorite || favorites.find(fav => fav.id === item.id))) {
        return item;
      }
      return false;
    });
    this.setState({ filteredProducts });
  }
  sortProducts() {
    const { sorting, products } = this.state;
    let sortedProducts = products.slice(0);
    sortedProducts.sort((a, b) => 
      sorting === 'price' ? a.price - b.price : a.id - b.id
    );
    this.setState({ products: sortedProducts });
  }
  scrollHandler = e => {
    let target = e.target.documentElement;
    if (target.clientHeight + target.scrollTop >= target.scrollHeight - scrollMargin) {
      this.setState({
        productsToShow: this.state.productsToShow + itemsToAdd
      });
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
    const fetchProducts = this.fetchData(urlProducts);
    const fetchSellers = this.fetchData(urlSellers);
    Promise.all([fetchProducts, fetchSellers])
      .then(res => {
        this.setState({ loading: false, products: res[0].data, sellers: res[1].data });
      })
      .catch(error => {
        this.setState({ loading: false, error: true });
        console.log(error);
      });
  }
  componentDidUpdate(_, prevState) {
    const { products, filteredProducts, filters, sorting, favorites } = this.state;
    if (prevState.filters !== filters || prevState.products !== products) {
      this.filterProducts();
    }
    if (prevState.sorting !== sorting) {
      this.sortProducts();
    }
    if (prevState.favorites !== favorites) {
      localStorage.setItem('avito-favorites', JSON.stringify(favorites));
      if (filteredProducts) this.filterProducts();
    }
  }
  render() {
    const { products, sellers, loading, error, filteredProducts, favorites } = this.state;
    const filterContext = {
      setFilter: this.setFilter,
      setSorting: this.setSorting
    };
    const favoritesContext = {
      addFavorite: this.addFavorite,
      removeFavorite: this.removeFavorite
    }
    return (
      <div className="App">
        {loading && !error && <div>Loading...</div>}
        {error && <div>ERROR</div>}
        {!loading && !error && 
          <Switch>
            <Route exact path='/' render={() => 
              <>
                <AppContextProvider value={filterContext}>
                  <FilterBar />
                  <SortBar />
                </AppContextProvider>
                <AppContextProvider value={favoritesContext}>
                  <ItemsList 
                    items={filteredProducts || products} 
                    itemsToShow={this.state.productsToShow}
                    sellers={sellers} favorites={favorites}
                  />
                </AppContextProvider>
              </>
            }/>
            <Route path='/favorites' render={() => 
              <>
                <AppContextProvider value={favoritesContext}>
                  <ItemsList 
                    items={favorites} sellers={sellers}  
                    itemsToShow={this.state.productsToShow}
                  />
                </AppContextProvider>
              </>
            }/>
          </Switch>
        }
      </div>
    );
  }
}

export default App;
