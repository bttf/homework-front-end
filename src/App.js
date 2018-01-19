import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import GifDisplay from './components/GifDisplay';
import GifDetails from './components/GifDetails';
import { API_KEY } from './config';
import './App.scss';

const _debounce = require('lodash/debounce');

class App extends Component {
  state = {
    gifs: [],
    currentQuery: null,
    selectedGif: null,
    limit: 25,
    currentOffset: 0,
  }

  constructor(props) {
    super(props);

    this.searchGifs = this.searchGifs.bind(this);
    this.selectGif = this.selectGif.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentDidMount() {
    this.fetchTrendingGifs();

    window.addEventListener('scroll', _debounce(this.scrollHandler, 200));
  }

  scrollHandler() {
    const threshold = document.documentElement.scrollHeight - window.innerHeight;
    const currentScrollTop = document.documentElement.scrollTop;

    if (threshold <= currentScrollTop) {
      this.setState({ currentOffset: this.state.currentOffset + this.state.limit });

      if (this.state.currentQuery) {
        this.searchGifs(this.state.currentQuery, this.state.currentOffset);
      } else {
        this.fetchTrendingGifs(this.state.currentOffset);
      }
    }
  }

  searchGifs(query = '', offset = 0, limit = 25) {
    if (query !== this.state.currentQuery) {
      this.setState({ currentQuery: query, gifs: [] });
    }

    if (!query.length) {
      return this.fetchTrendingGifs();
    }

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then(json => this.setState({ gifs: [...this.state.gifs, ...json.data] }));
  }

  fetchTrendingGifs(offset = 0, limit = 25) {
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then(json => this.setState({ gifs: [...this.state.gifs, ...json.data] }));
  }

  selectGif(gif) {
    this.setState({ selectedGif: gif });
    fetch(`https://api.giphy.com/v1/gifs/${gif.id}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(json => this.setState({ selectedGif: json.data }));
  }

  render() {
    return (
      <div className="application">
        <SearchBar search={this.searchGifs} />

        <h1>{this.state.currentQuery ? `Results for \'${this.state.currentQuery}\'` : 'What\'s Trending'}</h1>

        <div className="gifs">
          {this.state.gifs.map((gif, index) => (
            <GifDisplay
              key={index}
              index={index}
              imageURL={gif.images.downsized_medium.url}
              selectGif={this.selectGif.bind(this, gif)}
            />
          ))}
        </div>

        {this.state.selectedGif &&
            <GifDetails
              gif={this.state.selectedGif}
              unselectGif={gif => this.setState({
                selectedGif: null,
              })}
            />
        }
      </div>
    );
  }
}

export default App;
