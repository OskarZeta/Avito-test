import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class CategoryFilter extends Component {
  state = {
    category: 'all'
  }
  changeHandler = e => {
    this.setState({
      category: e.target.value
    }, () => this.context.setFilter({
      name: 'category',
      value: this.state.category
    }));
  }
  render() {
    const category = this.state.category;
    return(
      <div>
        <label>
          <input 
            type="radio" name="category" value="all" 
            checked={category === 'all'} onChange={this.changeHandler}
          />
          <span>all</span>
        </label>
        <label>         
          <input 
            type="radio" name="category" value="immovable" 
            checked={category === 'immovable'} onChange={this.changeHandler}
          />
          <span>immovable</span>
        </label>
        <label>         
          <input 
            type="radio" name="category" value="cameras" 
            checked={category === 'cameras'} onChange={this.changeHandler}
          />
          <span>cameras</span>
        </label>
        <label>
          <input 
            type="radio" name="category" value="auto" 
            checked={category === 'auto'} onChange={this.changeHandler}
          />
          <span>auto</span>
        </label>
        <label>       
          <input 
            type="radio" name="category" value="laptops" 
            checked={category === 'laptops'} onChange={this.changeHandler}
          />
          <span>laptops</span>
        </label>
      </div>
    );
  }
}

CategoryFilter.contextType = AppContext;

export default CategoryFilter;