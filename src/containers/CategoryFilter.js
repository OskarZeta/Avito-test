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
            className="form__input-radio"
            type="radio" name="category" value="all" 
            checked={category === 'all'} onChange={this.changeHandler}
          />
          <span className="form__custom-input-radio">Все</span>
        </label>
        <label>         
          <input 
            className="form__input-radio"
            type="radio" name="category" value="immovable" 
            checked={category === 'immovable'} onChange={this.changeHandler}
          />
          <span className="form__custom-input-radio">Недвижимость</span>
        </label>
        <label>         
          <input 
            className="form__input-radio"
            type="radio" name="category" value="cameras" 
            checked={category === 'cameras'} onChange={this.changeHandler}
          />
          <span className="form__custom-input-radio">Фотоаппараты</span>
        </label>
        <label>
          <input 
            className="form__input-radio"
            type="radio" name="category" value="auto" 
            checked={category === 'auto'} onChange={this.changeHandler}
          />
          <span className="form__custom-input-radio">Автомобили</span>
        </label>
        <label>       
          <input 
            className="form__input-radio"
            type="radio" name="category" value="laptops" 
            checked={category === 'laptops'} onChange={this.changeHandler}
          />
          <span className="form__custom-input-radio">Ноутбуки</span>
        </label>
      </div>
    );
  }
}

CategoryFilter.contextType = AppContext;

export default CategoryFilter;