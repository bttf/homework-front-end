import React, { PureComponent } from 'react';
import './styles.css';

const _debounce = require('lodash/debounce');

export default class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.search = _debounce(this.props.search, 400);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    const query = e.target.value;
    this.search(query);
  }

  render() {
    return (
      <div className="search-bar">
        <input type="text" onChange={this.changeHandler} placeholder="search for GIFs" />
      </div>
    );
  }
}
