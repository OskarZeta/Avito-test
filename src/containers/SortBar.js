import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class SortBar extends Component {
  state = {
    sort_by: this.context.sorting
  }
  changeHandler = e => {
    this.setState({
      sort_by: e.target.value
    }, () => this.context.setSorting(this.state.sort_by));
  }
  render() {
    const sort_by = this.state.sort_by;
    return(
      <form className="form">
        <h5>Сортировка (по возрастанию)</h5>
        <div>
          <label>
            <input 
              className="form__input-radio"
              type="radio" name="sorting" value="popularity"
              checked={sort_by === 'popularity'} onChange={this.changeHandler}
            />
            <span className="form__custom-input-radio">Популярность</span>
          </label>
          <label>
            <input 
              className="form__input-radio"
              type="radio" name="sorting" value="price"
              checked={sort_by === 'price'} onChange={this.changeHandler}
            />
            <span className="form__custom-input-radio">Цена</span>
          </label>
        </div>
      </form>
    );
  }
}

SortBar.contextType = AppContext;

export default SortBar;