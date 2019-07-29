import React, { Component } from 'react';
//import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import { urlProducts, urlSellers } from '../globals.js'; 

import ItemsList from '../components/ItemsList';

// import { AppContextProvider } from '../context/AppContext';

class App extends Component {
  state = {
    loading: true,
    error: false,
    products: null,
    sellers: null
  }
  fetchData(url) {
    return axios.get(url)
      .then(res => {
        if (res.status !== 200) throw new Error('Network error');
        return res.data;
      })
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
  render() {
    const { products, sellers, loading, error } = this.state;
    console.log(products, sellers);
    return (
      <div className="App">
        {loading && !error && <div>Loading...</div>}
        {error && <div>ERROR</div>}
        {!loading && !error && 
          <ItemsList items={products} sellers={sellers}/>
        }
      </div>
    );
  }
}

{/* <AppContextProvider value={sellers}>
<ItemsList items={products}/>
</AppContextProvider> */}

// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <p>
//     Edit <code>src/App.js</code> and save to reload.
//   </p>
//   <a
//     className="App-link"
//     href="https://reactjs.org"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Learn React
//   </a>
// </header> 

export default App;
