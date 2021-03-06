import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import ErrorComponent from '../components/ErrorComponent';
import Loading from '../components/Loading';
import Layout from '../components/layouts/Layout';
import LayoutFavorites from '../components/layouts/LayoutFavorites';

import { initialItems, itemsToAdd, scrollMargin, urlProducts, urlSellers } from '../globals';

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
    sorting: {
      value: 'default',
      direction: 'asc'
    },
    productsToShow: initialItems
  }
  fetchData(url) {
    return axios.get(url)
      .then(res => {
        if (res.status !== 200) throw new Error('Network error');
        return res.data;
      })
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
      let price = item.price || 0;
      if ((category === 'all' || item.category === category) &&
          (from === 'all' || price >= from) &&
          (to === 'all' || price < to) && 
          (!isFavorite || favorites.find(fav => fav.id === item.id))) {
        return item;
      }
      return false;
    });
    this.setState({ 
      filteredProducts
    }, () => this.setProductsToShow(initialItems));
  }
  sortProducts() {
    const { sorting: {value, direction}, products, sellers } = this.state;
    let sortedProducts = products.slice(0);
    sortedProducts.sort((a, b) => {
      switch (value) {
        case 'price' : {
          let priceA = a.price || 0;
          let priceB = b.price || 0;
          return direction === 'asc' ? priceA - priceB : priceB - priceA;
        }
        case 'rating' : {
          let sellerA = sellers.find(person => person.id === a.relationships.seller);
          let sellerB = sellers.find(person => person.id === b.relationships.seller);
          return direction === 'asc' ? sellerA.rating - sellerB.rating : sellerB.rating - sellerA.rating;
        }
        case 'default' :
        default : {
          return direction === 'asc' ?  a.id - b.id : b.id - a.id;
        }
      }
    });
    this.setState({ 
      products: sortedProducts 
    }, () => this.setProductsToShow(initialItems));
  }
  scrollHandler = e => {
    const { clientHeight, scrollTop, scrollHeight } = e.target.documentElement;
    if ((clientHeight + scrollTop >= scrollHeight - scrollMargin) &&
        (this.state.productsToShow < this.state.products.length )) {
      this.setProductsToShow(this.state.productsToShow + itemsToAdd);
    }
  }
  setTitle(title) { 
    document.title = title; 
  }
  setProductsToShow = value => this.setState({ productsToShow: value })
  setSorting = sorting => this.setState({ sorting })
  setFilter = filter => 
    this.setState({
      filters: { ...this.state.filters, ...{
        [filter.name] : filter.value
      }}
    })

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
    const fetchProducts = this.fetchData(urlProducts);
    const fetchSellers = this.fetchData(urlSellers);
    Promise.all([fetchProducts, fetchSellers])
      .then(res => this.setState({ loading: false, products: res[0].data, sellers: res[1].data }))
      .catch(error => this.setState({ loading: false, error }));
  }
  componentDidUpdate(_, prevState) {
    const { products, filteredProducts, filters, sorting, favorites } = this.state;
    if (prevState.filters !== filters || 
       (prevState.products !== products && prevState.products.length)) {
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
    const { 
      products, sellers, loading, error, filteredProducts, 
      favorites, productsToShow, sorting, filters 
    } = this.state;
    const { setFilter, setSorting, addFavorite, removeFavorite, setProductsToShow } = { ...this };
    return (
      <>
        {loading && !error && <Loading/>}
        {error && <ErrorComponent error={error}/>}
        {!loading && !error && 
          <Switch>
            <Route exact path='/' render={() => {
              this.setTitle("Avito test");
              return (
                <Layout 
                  filterContext={{setFilter, setSorting, sorting, filters}} 
                  favoritesContext={{addFavorite, removeFavorite}}
                  items={filteredProducts || products} itemsToShow={productsToShow}
                  sellers={sellers} favorites={favorites} setProductsToShow={setProductsToShow}
                />
              );
            }}/>
            <Route path='/favorites' render={() => {
              this.setTitle("Favorites");
              return (
                <LayoutFavorites 
                  favoritesContext={{addFavorite, removeFavorite}}
                  items={favorites} itemsToShow={productsToShow}
                  sellers={sellers} setProductsToShow={setProductsToShow}
                />
              );
            }}/>
            <Route render={() => {
              this.setTitle("404");
              return(<ErrorComponent error={"page not found"}/>);
            }}/>
          </Switch>
        }
      </>
    );
  }
}

export default App;