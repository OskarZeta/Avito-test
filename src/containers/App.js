import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { urlProducts, urlSellers } from '../globals.js'; 

import ItemsList from '../components/ItemsList';
import FilterBar from '../components/FilterBar';

import { AppContextProvider } from '../context/AppContext';

class App extends Component {
  state = {
    loading: true,
    error: false,
    products: [],
    filteredProducts: null,
    sellers: [],
    filters: {
      category: 'all',
      price: {
        from: 'all',
        to: 'all'
      },
      favorites: 'all'
    }
  }
  setFilter = filter => {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        [filter.name] : filter.value
      })
    });
  }
  fetchData(url) {
    return axios.get(url)
      .then(res => {
        if (res.status !== 200) throw new Error('Network error');
        return res.data;
      })
  }
  filterProducts() {
    const { filters, products } = this.state;
    const { category, price: { from, to } } = filters;
    let filteredProducts = products.slice(0);
    filteredProducts = filteredProducts.filter(item => { 
      if ((category === 'all' || item.category === category) &&
          (from === 'all' || item.price >= from) &&
          (to === 'all' || item.price < to)) {
        return item;
      }
      return false;
    });
    this.setState({ filteredProducts });
  }
  componentDidMount() {
    const fetchProducts = this.fetchData(urlProducts);
    const fetchSellers = this.fetchData(urlSellers);
    Promise.all([fetchProducts, fetchSellers])
      .then(res => {
        this.setState({
          loading: false,
          products: res[0].data,
          sellers: res[1].data
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
        console.log(error);
      });
  }
  componentDidUpdate(_, prevState) {
    if (prevState.filters !== this.state.filters) {
      this.filterProducts();
    }
  }
  render() {
    const { products, sellers, loading, error, filteredProducts } = this.state;
    const filterContext = {
      setFilter: this.setFilter
    };
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
                </AppContextProvider>
                <ItemsList items={filteredProducts ? filteredProducts : products} sellers={sellers}/>
              </>
            }/>
          </Switch>
        }
      </div>
    );
  }
}

export default App;
