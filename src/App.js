import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import GifDisplay from './components/GifDisplay';
import { API_KEY } from './config';
import './App.css';

class App extends Component {
  state = {
    gifs: [],
    currentQuery: null,
  }

  constructor(props) {
    super(props);
    this.searchGifs = this.searchGifs.bind(this);
  }

  componentDidMount() {
    this.fetchTrendingGifs();
  }

  searchGifs(query = '') {
    this.setState({ currentQuery: query, gifs: [] });

    if (!query.length) {
      return this.fetchTrendingGifs();
    }

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`)
      .then(response => response.json())
      .then(json => this.setState({ gifs: json.data }));
  }

  fetchTrendingGifs() {
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(json => this.setState({ gifs: json.data }));
  }

  render() {
    return (
      <div className="application">
        <SearchBar search={this.searchGifs} />
        <h1>{this.state.currentQuery ? `Results for \'${this.state.currentQuery}\'` : 'What\'s Trending'}</h1>
        <div className="gifs">
          {this.state.gifs.map((gif, index) =>{
            return (<GifDisplay key={index} gif={gif} />);
          })}
        </div>
      </div>
    );
  }
}

export default App;
