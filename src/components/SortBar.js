import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class SortBar extends Component {
  state = {
    sort_by: 'popularity'
  }
  changeHandler = e => {
    this.setState({
      sort_by: e.target.value
    }, () => this.context.setSorting(this.state.sort_by));
  }
  render() {
    const sort_by = this.state.sort_by;
    return(
      <form>
        <div>Sort</div>
        <label>
          <input 
            type="radio" name="sorting" value="popularity"
            checked={sort_by === 'popularity'} onChange={this.changeHandler}
          />
          <span>by popularity</span>
        </label>
        <label>
          <input 
            type="radio" name="sorting" value="price"
            checked={sort_by === 'price'} onChange={this.changeHandler}
          />
          <span>by price (asc)</span>
        </label>
      </form>
    );
  }
}

SortBar.contextType = AppContext;

export default SortBar;