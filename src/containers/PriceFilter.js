import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class PriceFilter extends Component {
  state = {
    from: 'all',
    to: 'all'
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
    return(
      <div>
        <label>
          <input 
            className="form__input-number"
            type="number" id="from" name="price" onChange={this.changeHandler}
            placeholder="Цена от"
          />
        </label>
        <label>
          <input 
            className="form__input-number"
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