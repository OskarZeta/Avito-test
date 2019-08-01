import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class PriceFilter extends Component {
  state = {
    from: this.context.filters.price.from,
    to: this.context.filters.price.to
  }
  changeHandler = e => {
    let { value, id } = e.target;
    if (!value) value = 'all';
    this.setState({
      [id]: value
    }, () => this.context.setFilter({
      name: 'price',
      value: this.state
    }));
  }
  render() {
    const {from, to} = this.state;
    return(
      <div>
        <label>
          <input 
            className="form__input-number" value={from === 'all' ? '' : from}
            type="number" id="from" name="price" onChange={this.changeHandler}
            placeholder="Цена от"
          />
        </label>
        <label>
          <input 
            className="form__input-number" value={to === 'all' ? '' : to}
            type="number" id="to" name="price" onChange={this.changeHandler}
            placeholder="до, руб."
          />
        </label>
      </div>
    );
  }
} 

PriceFilter.contextType = AppContext;
 
export default PriceFilter;