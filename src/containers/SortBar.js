import React, { Component } from 'react';
import AppContext from '../context/AppContext';

class SortBar extends Component {
  state = {
    value: this.context.sorting.value,
    direction: this.context.sorting.direction
  }
  changeHandler = e => {
    const {name, value} = e.target;
    this.setState({
      [name] : value
    }, () => this.context.setSorting(this.state));
  }
  render() {
    const { value, direction } = this.state;
    return(
      <form className="form">
        <div className="form__wrapper-sort">
          <div>
            <h5>Сортировка</h5>
            <div className="mr-5">
              <label>
                <input 
                  className="form__input-radio"
                  type="radio" name="value" value="default"
                  checked={value === 'default'} onChange={this.changeHandler}
                />
                <span className="form__custom-input-radio">Номер товара</span>
              </label>
              <label>
                <input 
                  className="form__input-radio"
                  type="radio" name="value" value="rating"
                  checked={value === 'rating'} onChange={this.changeHandler}
                />
                <span className="form__custom-input-radio">Рейтинг продавца</span>
              </label>
              <label>
                <input 
                  className="form__input-radio"
                  type="radio" name="value" value="price"
                  checked={value === 'price'} onChange={this.changeHandler}
                />
                <span className="form__custom-input-radio">Цена</span>
              </label>
            </div>
          </div>
          <div>
            <h5>Направление сортировки</h5>
            <div>
              <label>
                <input 
                  className="form__input-radio"
                  type="radio" name="direction" value="asc"
                  checked={direction === 'asc'} onChange={this.changeHandler}
                />
                <span className="form__custom-input-radio">
                  <span className="hidden__mobile">Возрастание</span>
                  <span className="hidden__desktop hidden-tablet">▲</span>
                </span>
              </label>
              <label>
                <input 
                  className="form__input-radio"
                  type="radio" name="direction" value="desc"
                  checked={direction === 'desc'} onChange={this.changeHandler}
                />
                <span className="form__custom-input-radio">
                  <span className="hidden__mobile">Убывание</span>
                  <span className="hidden__desktop hidden-tablet">▼</span> 
                </span>
              </label>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

SortBar.contextType = AppContext;

export default SortBar;